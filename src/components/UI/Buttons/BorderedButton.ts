import styled from 'styled-components'
import { Button } from './Button'

export const BorderedButton = styled(Button)``

BorderedButton.defaultProps = {
  ...Button.defaultProps,
  py: 5,
  px: 6,
  border: '1px solid',
  borderColor: 'black',
  borderRadius: 4,
}
