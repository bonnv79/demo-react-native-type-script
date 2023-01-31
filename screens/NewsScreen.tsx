import * as React from 'react'

import styled from 'styled-components/native'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

const Page = styled(View)`
  padding: 16px 16px 0 16px;
`
const Heading = styled(Text)`
  text-align: center;
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: bold;
`
const Title = styled(Text)`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: bold;
`
const TimeText = styled(Text)`
  font-size: 12px;
  margin-bottom: 8px;
`

function BoyScreen({
  data,
  handleDeleteItem
}: {
  data: any,
  handleDeleteItem: Function
}) {
  const Item = (props: any) => (
    <View style={styles.item}>
      <Title>{props?.title}</Title>
      <TimeText>17:15 30/1/2023</TimeText>
      <Text>{props?.content}</Text>
      <Button title="Delete" type="clear" onPress={() => handleDeleteItem(props?.id)} />
    </View>
  );

  const renderItem = (props: any) => {
    const { item } = props || {};
    return <Item id={item?._id} title={item?.name} content={item?.position} />;
  };

  return (
    <Page>
      <Heading>
        Technology News
      </Heading>
      {/* <Button
          title="Refresh News"
          onPress={async () => {
            loadData();
          }}
        /> */}
      <View style={styles.scrollView}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#f9c2ff',
    marginBottom: 16,
    padding: 8,
    border: '1px solid #c1c1c1',
    borderRadius: 8,
    // marginVertical: 4,
    // marginHorizontal: 8,
  },
  scrollView: {
    maxHeight: 'calc(100vh - 177px)'
  }
});

export default BoyScreen
