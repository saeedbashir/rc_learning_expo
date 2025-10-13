import MovieCard from '@/components/MovieCard';
import styled from 'styled-components/native';
import colors from '../../../theme/colors';

const styles = {
  Container: styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.background};
    padding: 20px;
  `,

  AvatarContainer: styled.View`
    align-items: center;
    justify-content: center;
    position: relative;
  `,

  AvatarLoader: styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
  `,

  Avatar: styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    margin-bottom: 15px;
    border-color: #ddd;
    border-width: 2px;
  `,

  Name: styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: ${colors.text};
  `,

  Email: styled.Text`
    font-size: 16px;
    color: ${colors.muted};
  `,

  Bio: styled.Text`
    font-size: 14px;
    color: ${colors.text};
    margin-top: 10px;
    text-align: center;
  `,

  Stats: styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 10px;
    gap: 8px;
  `,

  StatBox: styled.View`
    align-items: center;
  `,

  StatNumber: styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${colors.text};
  `,

  StatLabel: styled.Text`
    font-size: 14px;
    color: ${colors.muted};
  `,

  LocationRow: styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  `,

  LocationText: styled.Text`
    font-size: 14px;
    color: ${colors.muted};
    margin-left: 5px;
  `,

  TrendingCard: styled(MovieCard)`
    width: 160px;
    margin-horizontal: 8px;
  `,

  SectionTitle: styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${colors.text};
    margin-left: 16px;
    margin-bottom: 8px;
  `,

  EmptyText: styled.Text`
    font-size: 14px;
    color: ${colors.muted};
    text-align: center;
    margin-top: 20px;
  `,

  LoadingText: styled.Text`
    font-size: 16px;
    color: ${colors.muted};
    text-align: center;
    margin-top: 40px;
  `,
};

export default styles;
