import { View, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const LoadingStyled = styled(View)`
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.6;
  z-index: 10;
  justify-content: center;
`

export default function Loading(props: { loading?: Boolean | false }) {
  return props?.loading ? (
    <LoadingStyled>
      <ActivityIndicator size="large" />
    </LoadingStyled>
  ) : <></>;
}
