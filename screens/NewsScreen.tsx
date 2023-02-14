import * as React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components/native';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { ButtonGroup, Divider } from 'react-native-elements';
// import { FontAwesome } from '@expo/vector-icons';
import { addCartItem } from '../app/actions';

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

function NewsScreen({
  data,
  handleEditItem,
  handleDeleteItem,
  handleViewItem,
  handleAddCartItem,
  getDataById,
  navigation,
  route,
  loadData,
  cartData,
  isLogin,
}: {
  data: any,
  handleEditItem: Function,
  handleDeleteItem: Function,
  handleViewItem: Function,
  handleAddCartItem: Function,
  getDataById: Function,
  navigation?: any,
  route?: any,
  loadData?: any,
  cartData: any,
  isLogin: any,
}) {
  const buttons = ['View', 'Edit', 'Delete']

  const Item = (props: any) => {
    const { _id, title, createDate, content, creator, status }: {
      _id: String,
      title: String,
      createDate: Date,
      content: String,
      creator: String,
      status: Number,
    } = props || {};

    async function onView() {
      const data = await getDataById(_id);
      handleAddCartItem(data);
      handleViewItem(_id);
    }

    const onPressBtnGroup = (index: any) => {
      switch (index) {
        case 0:
          onView();
          break;
        case 1:
          handleEditItem(_id);
          break;
        case 2:
          handleDeleteItem(_id)
          break;
        default:
          break;
      }
    }

    return (
      <View style={styles.item}>
        <Title onPress={onView}>{title}</Title>
        <TimeText>
          {`${creator} - ${new Date(createDate).toLocaleString()}`}
        </TimeText>
        <ContentText>{content}</ContentText>
        {
          isLogin && (
            <View style={styles.horizontal}>
              <ButtonGroup
                onPress={onPressBtnGroup}
                buttons={buttons}
                containerStyle={{ marginTop: 16, marginHorizontal: 0 }}
              />
            </View>
          )
        }
        <Divider style={styles.hr} orientation="horizontal" />
      </View>
    )
  };

  const renderItem = (props: any) => {
    const { item } = props || {};
    return <Item {...item} />;
  };

  const onRefresh = () => {
    loadData();
  }

  return (
    <View style={styles.scrollView}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
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
    minWidth: 100,
    marginRight: 16,
  },
  horizontal: {
    // display: 'flex',
    // flexDirection: 'row',
    // width: '100%',
    // justifyContent: 'center'
  }
});

const mapStateToProps = (state: any) => {
  return {
    cartData: state.cart.cartData,
    isLogin: !!state.user.token
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleAddCartItem: (data: any) => {
      dispatch(addCartItem(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
