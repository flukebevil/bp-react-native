import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GithubService } from '../services/demo.service';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
}

const Hello: React.FC<Props> = ({ name, baseEnthusiasmLevel = 2 }) => {
  const [enthusiasmLevel, setEnthusiasmLevel] = useState(baseEnthusiasmLevel);
  const [datas, setDatas] = useState<{ msg: string }>();
  const service = new GithubService();

  useEffect(() => {
    if (!datas) {
      service.list().then((res) => {
        console.log(res.data)
        setDatas(res.data)
      }).catch(() => { });
    }
  }, [datas])

  const onIncrement = () => setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () => setEnthusiasmLevel(enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0);
  const getExclamationMarks = (numChars: number) => numChars > 0 ? Array(numChars + 1).join('!') : '';

  return (
    <View>
      <Text style={styles.greeting}>
        Hello{' '}
        {name}{datas?.msg}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <Text>
        Data from fetched api {datas?.msg}
      </Text>
      <View>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Hello;
