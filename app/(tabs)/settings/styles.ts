import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  email: {
    fontSize: 16,
    color: colors.muted,
  },
  bio: {
    fontSize: 14,
    color: colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  stats: {
    flexDirection: 'row', // row layout
    justifyContent: 'space-evenly', // evenly distribute items width: "100%",
    marginTop: 10,
    gap: 8,
  },
  statBox: {
    alignItems: 'center', // center number + label
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.muted,
  },
  locationRow: {
    flexDirection: 'row', // icon + text side by side
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    fontSize: 14,
    color: colors.muted,
    marginLeft: 5,
  },
});
