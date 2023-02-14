import * as React from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'

const Page = styled(View)`
  padding: 30px 30px 0 30px;
`

const TitleForm = styled(Text)`
  margin-bottom: 16px;
  font-weight: bold;
`

function CreateNewsScreen({
  handleCreateItem,
  showNotify,
  navigation,
  route,
  data,
}: {
  handleCreateItem: Function,
  showNotify: Function,
  navigation?: any,
  route?: any,
  data?: any,
}) {
  if (route?.name !== 'TabTwo') {
    return <></>;
  }
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
          // value={title}
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
          // value={content}
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
        <Button disabled={disabledBtn} title={btnTitle} onPress={async () => {
          handleCreateItem({ ...data, title, content, resetCreateForm });
        }} />
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingHorizontal: 0,
  },
});

export default CreateNewsScreen
