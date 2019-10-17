import React from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import useInput from './useInput.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { guessFavoriteLang } from "./guessFavoriteLang";

export const FlexWrapper = styled.div`
   background: rgba(35, 51, 75, 0.7) none repeat scroll 0% 0% / auto padding-box border-box;
   display: flex;
   flex-direction: column;
   margin: auto;
   width: 200px;
   padding-top: 30px;
   padding-bottom: 30px;
   padding-left: 15%;
   padding-right: 15%;
   border-radius: 5px;
`;

export const SearchInput = styled.input`
    display: inline-flex;
    width: 100%;
    height: 2.25rem;
    padding: .375rem .75rem;
    border: .0625rem solid #b2b2bf;
    border-radius: .1875rem;
    background: #fff;
    color: #111236;
    -webkit-appearance: none;
    width: 200px;
    font-weight: 700;
`;

export const SearchLabel = styled.label`
    display: inline-flex;
    margin-bottom: 10px;
    color: white;
`;

export const SubmitButton = styled.button`
    background: rgb(54, 192, 96) none repeat scroll 0% 0% / auto padding-box border-box;
    padding: 12px;
    margin-top: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 12px;
    font-weight: 700;
`;

export const ResultText = styled.div`
    margin: auto;
    text-align: center;
    margin-top: 30px;
    color: white;
    font-weight: 700;
    font-size:18px;
`;

export const SearchCard = () => {

    const { bind:bindInputUserNameField } = useInput('');
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState({hasResult: false, value: ''});

    const search = async() => {
        setIsSearching(true);
        guessFavoriteLang(bindInputUserNameField.value).then((response) => {
            setResult({hasResult: true, value: response})
            setIsSearching(false)
        }).catch((errror) => {
            setResult({hasResult: true, value: errror})
            setIsSearching(false)
        })
    }

    return (<FlexWrapper>
        <SearchLabel htmlFor="user-name-search">Search by user name</SearchLabel>
        <SearchInput type="search" data-testid="search-testid" id="user-name-search" name="q"
                     aria-label="Search by user name"
            {...bindInputUserNameField} />
        <SubmitButton onClick={search} type="submit" >
            <span style={{fontSize: '14px', marginRight: '10px'}}>{!isSearching ? 'Search' : 'Loading'}</span>
            {isSearching ? <FontAwesomeIcon data-testid="spinner-testid" spin className='icon-element__icon' size="sm" icon={faSync}/> : null}
        </SubmitButton>
        {result.hasResult && <ResultText data-testid="result-testid">{result.value}</ResultText>}
    </FlexWrapper>)

}
export default SearchCard

