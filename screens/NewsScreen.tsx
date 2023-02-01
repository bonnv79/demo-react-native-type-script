import * as React from 'react';

import styled from 'styled-components/native';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

// const Page = styled(View)`
//   padding: 16px 16px 0 16px;
// `
// const Heading = styled(Text)`
//   text-align: center;
//   font-size: 24px;
//   margin-bottom: 16px;
//   font-weight: bold;
// `
const Title = styled(Text)`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: bold;
`
const TimeText = styled(Text)`
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: capitalize;
`

// const STATUS = {
//   '0': 'Hide',
//   '1': 'Show',
//   '2': 'Hold'
// }

function BoyScreen({
  data,
  handleEditItem,
  handleDeleteItem,
}: {
  data: any,
  handleEditItem: Function,
  handleDeleteItem: Function,
}) {
  const Item = (props: any) => {
    const { _id, title, createDate, content, creator, status }: {
      _id: String,
      title: String,
      createDate: Date,
      content: String,
      creator: String,
      status: Number,
    } = props || {};

    return (
      <View style={styles.item}>
        <Title>{title}</Title>
        <TimeText>
          {`${creator} - ${new Date(createDate).toLocaleString()}`}
        </TimeText>
        <Text>{content}</Text>
        <View style={styles.horizontal}>
          {/* <Button
            style={styles.btn}
            type="clear"
            title={
              <FontAwesome size={30} style={{ marginTop: 0 }} name="edit" />
            }
            onPress={() => handleEditItem(_id)}
          /> */}
          <Button
            style={styles.btn}
            type="clear"
            title={
              <FontAwesome size={30} style={{ marginTop: 0 }} name="trash" />
            }
            onPress={() => handleDeleteItem(_id)}
          />
        </View>
        <Divider style={styles.hr} orientation="horizontal" />
      </View>
    )
  };

  const renderItem = (props: any) => {
    const { item } = props || {};
    return <Item {...item} />;
  };

  return (
    <View style={styles.scrollView}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 24,
    paddingBottom: 0,
    // marginBottom: 16,
    // border: '1px solid #c1c1c1',
    // borderRadius: 8,
    // backgroundColor: '#f9c2ff',
    // marginVertical: 4,
    // marginHorizontal: 8,
  },
  scrollView: {
    maxHeight: '100%'
  },
  hr: {
    marginTop: 24
  },
  btn: {
    marginTop: 16,
    // minWidth: 100,
    marginLeft: 16,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end'
  }
});

export default BoyScreen
