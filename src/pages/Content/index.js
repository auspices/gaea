import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import contentQuery from './queries/content'

import { generate as generateHrefs } from 'util/hrefs'

import { Box } from 'components/UI/Box'
import { Link } from 'components/UI/Link'
import { Icons } from 'components/UI/Icons'
import { Header } from 'components/Header'
import { ContentEntity } from 'components/ContentEntity'
import { ContentEntityHeader } from 'components/ContentEntityHeader'
import { WithAlerts } from 'components/Alerts'
import { ContentSettings } from 'components/ContentSettings'

const Content = styled(Box).attrs({
  mt: 6,
  p: 6,
  borderRadius: 4,
})`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default WithAlerts(({ id, dispatchError }) => {
  return (
    <Query query={contentQuery} variables={{ id }} onError={dispatchError}>
      {({ data, loading, error }) => {
        if (error) return null

        if (loading) {
          return <Header isLoading />
        }

        const {
          me,
          me: { username },
          content,
          content: { collection, entity },
        } = data

        const hrefs = generateHrefs(me)

        return (
          <>
            <Header>
              <Link to={hrefs.collections}>{username}</Link>
              <Link to={hrefs.collection(collection)}>{collection.title}</Link>

              <ContentEntityHeader key="primary" entity={entity} />

              <Link to={hrefs.sampleCollectionContent(collection)}>
                <Icons name="Shuffle" />
              </Link>
            </Header>

            <ContentSettings mt="-1px" width="100%" content={content} />

            <Content>
              <ContentEntity entity={entity} />
            </Content>
          </>
        )
      }}
    </Query>
  )
})
