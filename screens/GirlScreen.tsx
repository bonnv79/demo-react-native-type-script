import * as React from 'react'
import styled from 'styled-components/native'
import { Text, TouchableOpacity, View } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import { sendPushNotification, getToken, Token } from '../services/api'
import Loading from '../components/Loading'

const Page = styled(View)`
  padding: 30px 30px 0 30px;
`

const Heading = styled(Text)`
  text-align: center;
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: bold;
`

const ActionContainer = styled(View)`
  margin-top: 30px;
`

const ButtonContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const SummonButton = styled(TouchableOpacity)<{ color?: string }>`
  flex: 48% 0 0;
  background-color: ${(props) => props.color || 'red'};
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  height: 150px;
  align-items: center;
  justify-content: center;
  color: white;
`
const SummonButtonText = styled(Text)`
  color: white;
  font-size: 18px;
`

const GirlScreen: React.FC = () => {
  const [tokenInput, setTokenInput] = React.useState('')
  const [token, setToken] = React.useState<Token | undefined>()
  const [loading, setLoading] = React.useState<Boolean>();

  const getTokenFromId = async (tokenId: string) => {
    setLoading(true);
    const storedToken = await getToken(tokenId)
    setToken(storedToken)
    setLoading(false);
  }

  return (
    <>
      <Loading loading={loading} />
      <Header centerComponent={{ text: 'Cho bạn nữ 👧', style: { color: '#fff' } }} />

      <Page>
        {token ? (
          <View>
            <Heading>Mã số của bạn trai là {token.id}</Heading>
            <Heading>Có thể triệu hồi người yêu 👦!</Heading>
            <Button title="Nhập mã số mới!" onPress={() => setToken(undefined)} type="outline" />
          </View>
        ) : (
          <View>
            <Input
              label="Mã số bạn trai 👦"
              value={tokenInput}
              onChangeText={setTokenInput}
              placeholder="Nhập mã số của bạn trai vào đây!"
            />
            <Button title="Xác nhận mã số" onPress={() => getTokenFromId(tokenInput)} />
          </View>
        )}

        {token && (
          <ActionContainer>
            <Heading>Triệu hồi người yêu 👦</Heading>

            <ButtonContainer>
              <SummonButton
                color="#e74c3c"
                onPress={() =>
                  sendPushNotification(
                    token.token,
                    '🍱 Em đói quá',
                    'Qua chở em đi ăn đi em đói quá 😞.'
                  )
                }>
                <SummonButtonText>🍱Em đói quá</SummonButtonText>
              </SummonButton>
              <SummonButton
                color="#2980b9"
                onPress={() =>
                  sendPushNotification(
                    token.token,
                    '🧋 Thèm trà sữa',
                    'Huhu em thèm Phúc Long Gong Cha 😞'
                  )
                }>
                <SummonButtonText>🥤Thèm trà sữa</SummonButtonText>
              </SummonButton>
              <SummonButton
                color="#2ecc71"
                onPress={() =>
                  sendPushNotification(token.token, '😢 Nhớ anh quá', 'Nhớ anh ghê ahuhu 😞!')
                }>
                <SummonButtonText>😢Nhớ anh quá</SummonButtonText>
              </SummonButton>
              <SummonButton
                color="#f1c40f"
                onPress={() =>
                  sendPushNotification(
                    token.token,
                    '📱 Gọi e nha',
                    'Sao qua giờ không gọi, không nhớ e à 😤!'
                  )
                }>
                <SummonButtonText>📱Gọi e nha</SummonButtonText>
              </SummonButton>
            </ButtonContainer>
          </ActionContainer>
        )}
      </Page>
    </>
  )
}

export default GirlScreen
