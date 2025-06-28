import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../src/store/slices/counterSlice';

import React from 'react';
import type { RootState } from '../../src/store/store';

export default function HomeScreen() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={{ padding: 60, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, color: 'white' }}>Contador: {count}</Text>
      <Button title="Incrementar" onPress={() => dispatch(increment())} />
      <Button title="Decrementar" onPress={() => dispatch(decrement())} />
    </View>
  );
}
