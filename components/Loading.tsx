import { View, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements';
import styled from 'styled-components/native'

// const LoadingStyled = styled(View)`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background: black;
//   opacity: 0.6;
//   z-index: 10;
//   justify-content: center;
// `

export default function Loading(props: {
  loading?: any,
  onBackdropPress?: () => {}
}) {
  return props?.loading ? (
    <Overlay
      isVisible={props?.loading}
      onBackdropPress={props?.onBackdropPress}
      overlayStyle={{
        backgroundColor: 'transparent',
        // boxShadow: 'none',
      }}
    >
      <ActivityIndicator size="large" color="white" />
    </Overlay>
  ) : <></>;
}
