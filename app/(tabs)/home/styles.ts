import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: colors.muted,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // allows wrapping
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  tagBox: {
    backgroundColor: colors.muted + '22',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    margin: 4,
    flexGrow: 1,
    alignItems: 'stretch',
  },
  tagText: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 12,
  },
});
