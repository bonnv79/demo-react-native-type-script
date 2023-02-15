import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { addCartItem } from '../app/actions';
import { getNewsInfoState } from '../app/selector/newsSelector';

import { View } from '../components/Themed';

const Title = styled(Text)`
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: bold;
`
const TimeText = styled(Text)`
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: capitalize;
`
const ContentText = styled(Text)`
  font-size: 16px;
`

function ModalScreen({ data }: { data: any }) {
  const { _id, title, createDate, content, creator, status }: {
    _id: String,
    title: String,
    createDate: Date,
    content: String,
    creator: String,
    status: Number,
  } = data || {};
  if (!data?._id) {
    return (
      <Text style={styles.loadingText}>Loding...</Text>
    )
  }
  return (
    <View style={styles.container}>
      <Title>{title}</Title>
      <TimeText>
        {`${creator} - ${new Date(createDate).toLocaleString()}`}
      </TimeText>
      <ContentText>{content}</ContentText>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const mapStateToProps = (state: any) => {
  return {
    data: getNewsInfoState(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleAddCartItem: (data: any) => {
      dispatch(addCartItem(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  loadingText: {
    textAlign: 'center',
    paddingVertical: 16
  }
});
