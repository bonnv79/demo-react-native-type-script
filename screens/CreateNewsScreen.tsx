import * as React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Loading from '../components/Loading'

const Page = styled(View)`
  padding: 30px 30px 0 30px;
`

function GirlScreen({ handleCreateItem }: { handleCreateItem: Function }) {
  const [loading, setLoading] = React.useState<Boolean>();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const resetCreateForm = () => {
    setTitle('');
    setContent('');
  }

  return (
    <>
      <Loading loading={loading} />

      <Page>
        <View>
          <Input
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Input title..."
          />
          <Input
            label="Content"
            value={content}
            onChangeText={setContent}
            placeholder="Input content..."
          />
          <Button title="Create" onPress={async () => {
            handleCreateItem({ title, content, resetCreateForm })
          }} />
        </View>
      </Page>
    </>
  )
}

export default GirlScreen
