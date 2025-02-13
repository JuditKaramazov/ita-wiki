import styled from 'styled-components'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FlexBox, dimensions } from '../../styles'
import { Spinner, Text } from '../atoms'
import CardResource from './CardResource'
import { useSortByDate } from '../../hooks/useSortByDate'
import { useSortByVotes } from '../../hooks/useSortByVotes'
import { useAuth } from '../../context/AuthProvider'
import { TResource, TSortOrder } from '../../types'

const SpinnerStyled = styled(Spinner)`
  align-self: center;
  justify-content: center;
`
const StyledFlexBox = styled(FlexBox)`
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  overflow: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledText = styled(Text)`
  margin: 2rem;
`

type TResourceCardList = {
  sortOrder: TSortOrder
  handleAccessModal: () => void
  isSortByVotesActive: boolean
  resourcesData: TResource[] | undefined
  resourcesError: Error | unknown
  resourcesLoading: boolean
  onSelectedSortOrderChange: (selectedSortOrder: Array<TResource>) => void
}

const ResourceCardList: FC<TResourceCardList> = ({
  onSelectedSortOrderChange,
  handleAccessModal,
  sortOrder,
  isSortByVotesActive,
  resourcesData,
  resourcesError,
  resourcesLoading,
}) => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const { sortedItems } = useSortByDate<TResource>(
    resourcesData,
    'updatedAt',
    sortOrder
  )
  const { sortedVotes } = useSortByVotes<TResource>(resourcesData, sortOrder)

  const selectedSortOrder = isSortByVotesActive ? sortedVotes : sortedItems

  if (resourcesError) return <p>Ha habido un error...</p>
  if (onSelectedSortOrderChange) {
    onSelectedSortOrderChange(selectedSortOrder)
  }

  return (
    <StyledFlexBox direction="column" data-testid="resource-list">
      {resourcesLoading && (
        <SpinnerStyled size="medium" as="output" data-testid="spinner" />
      )}
      {resourcesData && resourcesData?.length > 0 ? (
        selectedSortOrder.map((resource: TResource) => (
          <CardResource
            key={resource.id}
            id={resource.id}
            img=""
            title={resource.title}
            url={resource.url}
            description={resource.description}
            voteCount={resource.voteCount}
            createdBy={resource.user ? resource.user.name : ''}
            createdAt={resource.createdAt}
            updatedAt={resource.updatedAt}
            handleAccessModal={handleAccessModal}
            isFavorite={user ? resource.isFavorite : false}
            editable={
              resource.user
                ? user?.name === resource.user.name
                : user?.id === resource.userId
            }
            resourceType={resource.resourceType}
            topics={resource.topics}
          />
        ))
      ) : (
        <FlexBox>
          <StyledText data-testid="emptyResource">
            {t('¡Vaya! :/')}
            <br />
            <br />
            {t('Todavía no hay recursos de este tipo.')}
          </StyledText>
        </FlexBox>
      )}
    </StyledFlexBox>
  )
}

export { ResourceCardList }
