import * as React from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import BackHome from '../components/BackHome'
import { connect } from 'react-redux'
import { getNewsInfoState } from '../app/selector/newsSelector'
import { requestCreateNews } from '../app/actions/newsActions'

const Page = styled(View)`
  padding: 30px 30px 0 30px;
`

const TitleForm = styled(Text)`
  margin-bottom: 16px;
  font-weight: bold;
`

function CreateNewsScreen({
  handleCreateNews,
  navigation,
  data,
}: {
  handleCreateNews: Function,
  navigation?: any,
  data?: any,
}) {
  const [title, setTitle] = React.useState(data?.title);
  const [content, setContent] = React.useState(data?.content);

  const [isTitle, setIsTitle] = React.useState(false);
  const [isContent, setIsContent] = React.useState(false);

  const resetCreateForm = () => {
    setTitle('');
    setContent('');
  }

  const formTile = data?._id ? 'Edit Form' : 'Create Form';
  const btnTitle = data?._id ? 'Save' : 'Create';
  const titleError = !title && isTitle ? 'Required' : '';
  const contentError = !content && isContent ? 'Required' : '';
  const disabledBtn = !title || !content;

  return (
    <Page>
      <TitleForm h3>{formTile}</TitleForm>
      <View>
        <Input
          containerStyle={styles.inputContainerStyle}
          label="Title"
          defaultValue={title}
          onChangeText={(val) => {
            setTitle(val);
            if (!isTitle) {
              setIsTitle(true);
            }
          }}
          placeholder="Input title..."
          errorMessage={titleError}
        />
        <Input
          containerStyle={styles.inputContainerStyle}
          label="Content"
          defaultValue={content}
          onChangeText={(val) => {
            setContent(val);
            if (!isContent) {
              setIsContent(true);
            }
          }}
          placeholder="Input content..."
          errorMessage={contentError}
        />
        <Button style={styles.loginBtn} disabled={disabledBtn} title={btnTitle} onPress={async () => {
          const { creator = 'admin', status = 0 } = data;
          handleCreateNews({ ...data, title, content, creator, status });
          navigation.navigate('TabOne');
        }} />
        <BackHome onPress={() => navigation.navigate('TabOne')} />
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingHorizontal: 0,
  },
  loginBtn: {
    marginTop: 16
  },
});

const mapStateToProps = (state: any) => {
  return {
    data: getNewsInfoState(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleCreateNews: (data: any) => dispatch(requestCreateNews(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsScreen);
