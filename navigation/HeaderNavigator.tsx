import * as React from 'react';
import { Text } from 'react-native';

import Loading from '../components/Loading';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { getLoadingState } from '../app/selector/appSelector';

const ALERT_COLOR = {
  danger: '#f44336',
  success: '#04AA6D',
  info: '#2196F3',
  warning: '#ff9800',
};

const Msg = styled(Text) <{ color?: string }>`
  position: absolute;
  z-index: 10;
  top: ${Constants?.statusBarHeight}px;
  background-color: #f44336;
  background-color: ${(props) => props.color || ALERT_COLOR.success};
  color: white;
  padding: 12px;
  width: 100%;
`

let timeOut: any = null;

function HeaderNavigator(props: any) {
  const {
    loading,
  } = props;
  const [msg, setMsg] = React.useState<any>(null);

  // const showNotify = (val: String, type?: String) => {
  //   if (timeOut) {
  //     clearTimeout(timeOut);
  //   }
  //   setMsg({
  //     msg: val,
  //     type
  //   });
  //   timeOut = setTimeout(() => {
  //     setMsg('');
  //   }, 3000);
  // }

  return (
    <>
      <Loading loading={loading} />
      {
        msg && (
          <Msg color={msg.type}>
            {msg.msg}
          </Msg>
        )
      }
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    loading: getLoadingState(state),
  }
}

export default connect(mapStateToProps, null)(HeaderNavigator);