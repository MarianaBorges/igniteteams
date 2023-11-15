import { FlatList } from 'react-native';
import { Container, Title } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';


export function Groups() {

  const [groups, setGroups] = useState([]);
  const { navigate } = useNavigation()

  function handleNewGroup() {
    navigate('newGroup');
  }

  return (
    <Container>
      <Header/>

      <Highlight 
        title='Turmas'
        subTitle='Jogue com a sua turma'
      />

      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        renderItem={({item}) => (
          <GroupCard 
            title={item} 
          />
        )}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira Turma?'/>}
      />

      <Button title='Criar nova turma' onPress={handleNewGroup} />
    </Container>
  );
}
