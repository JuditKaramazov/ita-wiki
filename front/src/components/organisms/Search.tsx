import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { InputGroup } from '../molecules'
import { FlexBox, colors, device, dimensions, font } from '../../styles'
import { Button, Icon, Input, Title } from '../atoms'
import { TResource } from '../../types'

type TSearch = {
  searchValue: string | null
  isSearchError: boolean
  isSearch: boolean
  resourcesData: TResource[] | undefined
  toggleSearch: () => void
  handleSearch: (value: string) => void
}

const SearchBar = styled(InputGroup)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    color: ${colors.gray.gray4};
    margin-top: ${dimensions.spacing.xxs};
    margin-right: 0.08rem;
    width: 40%;
    max-width: 11rem;
    justify-content: flex-end;
    ${FlexBox} {
      justify-content: flex-start;
    }

    ${Input} {
      padding: ${dimensions.spacing.base};
      padding-left: 2.8rem;
      font-size: ${font.xs};
      font-weight: ${font.regular};
      border: none;
      text-align: right;
    }

    ${Icon} {
      padding-left: 0.8rem;
      font-size: ${font.base};
      scale: 1.8;
      color: ${colors.gray.gray3};
    }
  }
`

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InputSearchBar = styled.div`
  display: flex;
  height: ${dimensions.spacing.lg};
`

const InputSearch = styled.input<{ isError: boolean }>`
  width: 100%;
  margin-right: ${dimensions.spacing.xxxs};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray3};
  padding: ${dimensions.spacing.base};
  color: ${(props) => (props.isError ? colors.error : 'inherit')};
  ::placeholder {
    color: ${(props) => (props.isError ? colors.error : null)};
  }
`
const CancelSearchButton = styled(Button)`
  color: ${colors.gray.gray3};
  background-color: ${colors.white};
  border: 1px solid ${colors.gray.gray3};
  width: fit-content;
  padding: ${dimensions.spacing.base} ${dimensions.spacing.xs};

  &:hover {
    background-color: ${colors.white};
    border: 1px solid ${colors.primary};
  }
`

const Search: React.FC<TSearch> = ({
  resourcesData,
  toggleSearch,
  isSearch,
  searchValue,
  isSearchError,
  handleSearch,
}) => {
  const { t } = useTranslation()
  const { state } = useLocation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleCancelSearch = () => {
    toggleSearch()
    handleSearch('')
  }
  if (isSearch) {
    return (
      <SearchContainer>
        <Title as="h2" fontWeight="bold">
          {t('Buscar recurso')}
        </Title>
        <InputSearchBar>
          <InputSearch
            type="text"
            data-testid="inputSearch"
            value={searchValue ?? ''}
            onChange={handleChange}
            placeholder={isSearchError ? t('searchErrorMessage') : ''}
            isError={!!(isSearchError && (searchValue ?? '').length === 1)}
            autoFocus
          />

          <CancelSearchButton
            onClick={handleCancelSearch}
            data-testid="cancelSearchButton"
          >
            X
          </CancelSearchButton>
        </InputSearchBar>
        {searchValue && searchValue.length >= 2 && !isSearchError ? (
          <span style={{ marginTop: '20px', fontWeight: 'bold' }}>
            {t('Mostrando')} {resourcesData?.length} {t('resultados para')}{' '}
            &quot;{searchValue}&quot;
          </span>
        ) : null}
      </SearchContainer>
    )
  }
  return (
    <>
      <Title as="h2" fontWeight="bold">
        {t('Recursos de (category)', {
          name: state?.name,
        })}
      </Title>
      <SearchBar
        data-testid="searchBar"
        label="searchResource"
        name="searchResource"
        placeholder={t('Buscar recurso')}
        id="searchResource"
        icon="search"
        onClick={toggleSearch}
      />
    </>
  )
}
export { Search }
