import * as React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components/native';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { ButtonGroup, Divider } from 'react-native-elements';
import { getNews, getNewsById, requestDeleteNews } from '../app/actions/newsActions';
import { getNewsDataSelector } from '../app/selector/newsSelector';

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
  isLogin,
  navigation,
  getNewsList,
  handleDeleteNews,
  handleGetNewsById,
}: {
  data: any,
  isLogin: any,
  navigation: any,
  getNewsList?: any,
  handleDeleteNews: Function,
  handleGetNewsById: Function,

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
      handleGetNewsById({ id: _id });
      navigation.navigate('Modal');
    }

    const switchEditPage = () => {
      navigation.navigate('TabTwo');
    }

    const onPressBtnGroup = (index: any) => {
      switch (index) {
        case 0:
          onView();
          break;
        case 1:
          handleGetNewsById({ id: _id, switchEditPage });
          break;
        case 2:
          handleDeleteNews({ id: _id })
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
    getNewsList();
  }

  React.useEffect(() => {
    getNewsList();
    return;
  }, []);

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

  }
});

const mapStateToProps = (state: any) => {
  return {
    isLogin: !!state.user.token,
    data: getNewsDataSelector(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleGetNewsById: (data: any) => {
      dispatch(getNewsById(data));
    },
    handleDeleteNews: (data: any) => dispatch(requestDeleteNews(data)),
    getNewsList: () => dispatch(getNews()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
