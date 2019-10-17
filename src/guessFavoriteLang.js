const API_ENDPOINT = "https://api.github.com";

const fetchReposByUser = (userName) => {
    return fetch(`${API_ENDPOINT}/users/${userName}/repos`)
        .then(res => res.json())
        .then(json => {
            return json
        })
        .catch((err) => {
            return err
        })
}

const filterReposByForked = (repos, isForked) => {
    return repos.filter((repo) => {
        if (repo.fork === isForked) {
            return true;
        }
        else {
            return false;
        }
    })
};

const calculateRepoAverageSize = (repos) => {
    let size = 0;
    repos.forEach((repo) => {
        size = repo.size;
    })
    return size / repos.length;
};

const calculateLanguagesContributions = (languageContributions, repos, valueFactor) => {
    repos.forEach((repo) => {
        if (languageContributions[repo.language] === undefined) {
            languageContributions[repo.language] = repo.size * valueFactor
        }
        else {
            languageContributions[repo.language] = repo.size * valueFactor + parseInt(languageContributions[repo.language])
        }
    })
    return languageContributions;

};

const calculateLanguagesContributionsByForked = (languageContributions, repos, valueFactor, sizeFactor) => {
    repos.forEach((repo) => {
        if (languageContributions[repo.language] === undefined) {
            languageContributions[repo.language] = sizeFactor * valueFactor
        }
        else {
            languageContributions[repo.language] = sizeFactor * valueFactor + parseInt(languageContributions[repo.language])
        }
    })
    return languageContributions;
};

/*Favorite language is the one with the biggest accrued size/value
Forked repos has a valueFactor 1, own repos has a valuefactor 5. This is why its 'relative'
Forked repos counts, but not the actual size, a forked repo is given the averageSize of users repos and given a valuefactor=1*/
export const guessFavoriteLang = async(userName) => {
    const repos = await fetchReposByUser(userName);
    if (repos.length > 0) {
        let notForkedRepos = filterReposByForked(repos, false);
        let forkedRepos = filterReposByForked(repos, true);
        forkedRepos = forkedRepos.filter((repo) => repo.language !== null);
        notForkedRepos = notForkedRepos.filter((repo) => repo.language !== null);
        let repoAverageSize = calculateRepoAverageSize(notForkedRepos);
        let relativeLanguageSize = {}
        relativeLanguageSize = calculateLanguagesContributions(relativeLanguageSize, notForkedRepos, 5);
        relativeLanguageSize = calculateLanguagesContributionsByForked(relativeLanguageSize, forkedRepos, 1, repoAverageSize);
        relativeLanguageSize = Object.entries(relativeLanguageSize).map(([key, value]) => ({key, value}));

        var max = relativeLanguageSize[0].value
        let favoriteLanguage = relativeLanguageSize.filter((item) => {
            if (item.value >= max) {
                return true;
            }
            else {
                return false;
            }
        })
        return Promise.resolve(favoriteLanguage[0].key);
    }
    else {
        return Promise.reject('No repositories for that user');
    }
}
