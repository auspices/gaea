import React from 'react'
import styled from 'styled-components'

import Link from 'components/UI/Link'
import Box from 'components/UI/Box'

const Container = styled(Box)`
  display: flex;
  justify-content: stretch;
  width: 100%;
  user-select: none;
`

const Button = styled(Link).attrs({
  px: 6,
  py: 5,
})`
  flex: 1;
  border: 1px solid black;
  margin-left: -1px;
  text-align: center;

  &:first-child {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:hover {
    text-decoration: underline;
  }

  ${props =>
    props.disabled &&
    `
    opacity: 0.25;
  `}
`

const Page = ({ pageNumber, label, href, per, currentPage, ...rest }) => (
  <Button
    to={{
      pathname: href,
      search: `?page=${pageNumber}&per=${per}`,
    }}
    disabled={pageNumber === currentPage}
    {...rest}
  >
    {label || pageNumber}
  </Button>
)

const Pagination = ({ page, per, total, href, interval, ...rest }) => {
  const totalPages = Math.ceil(total / per)
  const prevPage = page > 1 ? page - 1 : page
  const nextPage = page < totalPages ? page + 1 : page

  if (totalPages <= 1) return null

  return (
    <Container {...rest}>
      <Page
        key="first"
        pageNumber={1}
        currentPage={page}
        label="A"
        href={href}
        per={per}
      />

      <Page
        key="previous"
        pageNumber={prevPage}
        currentPage={page}
        label="Previous"
        rel="prev"
        href={href}
        per={per}
      />

      {/* Left surrounding pages */}
      {[...Array(interval).keys()]
        .map(i =>
          page > i + 1 ? (
            <Page
              key={page - (i + 1)}
              pageNumber={page - (i + 1)}
              currentPage={page}
              href={href}
              per={per}
              display={['none', 'none', 'block']}
            />
          ) : (
            undefined
          )
        )
        .filter(Boolean)
        .reverse()}

      <Page
        key="current"
        pageNumber={page}
        currentPage={page}
        href={href}
        per={per}
      />

      {/* Right surrounding pages */}
      {[...Array(interval).keys()]
        .map(i =>
          totalPages - page + 1 > i + 1 ? (
            <Page
              key={page + (i + 1)}
              pageNumber={page + (i + 1)}
              currentPage={page}
              href={href}
              per={per}
              display={['none', 'none', 'block']}
            />
          ) : (
            undefined
          )
        )
        .filter(Boolean)}

      <Page
        key="next"
        pageNumber={nextPage}
        currentPage={page}
        label="Next"
        href={href}
        per={per}
        rel="next"
      />

      <Page
        key="last"
        pageNumber={totalPages}
        currentPage={page}
        label="Ω"
        href={href}
        per={per}
      />
    </Container>
  )
}

Pagination.defaultProps = {
  page: 1,
  per: 24,
  interval: 5,
}

export default Pagination
