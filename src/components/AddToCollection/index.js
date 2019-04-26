import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'

import { TextInput } from 'components/UI/Inputs'
import { WithAlerts } from 'components/Alerts'

import addToCollectionMutation from './mutations/addToCollection'

class AddToCollection extends PureComponent {
  state = {
    mode: 'resting',
    value: '',
    key: new Date().getTime(),
  }

  handleSubmit = e => {
    e.preventDefault()

    const { value } = this.state
    const { per } = this.props

    const {
      addToCollection,
      collection,
      dispatchAlert,
      dispatchError,
    } = this.props

    this.setState({ mode: 'adding' })

    addToCollection({
      variables: {
        id: collection.id,
        sourceUrl: value,
        page: 1,
        per,
      },
    })
      .then(() => {
        dispatchAlert('Added successfully')

        this.setState({
          mode: 'resting',
          key: new Date().getTime(),
        })
      })
      .catch(err => {
        dispatchError(err)

        this.setState({ mode: 'error' })
      })
  }

  handleChange = ({ target: { value } }) => this.setState({ value })

  render() {
    const { mode, key } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          key={key}
          placeholder="add to this collection"
          onChange={this.handleChange}
          disabled={mode === 'adding'}
          required
          autoFocus
        />
      </form>
    )
  }
}

export default graphql(addToCollectionMutation, {
  name: 'addToCollection',
})(WithAlerts(AddToCollection))
