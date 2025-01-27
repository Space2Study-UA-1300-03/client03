export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: '0 auto'
  },
  nameFieldsContainer: {
    display: 'flex',
    gap: '15px',
    width: '100%'
  },
  halfWidth: {
    width: 'calc(50% - 8px)',
    minWidth: '192px'
  },
  agreeTerms: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  submitButton: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#333'
    }
  },
  link: {
    textDecoration: 'underline',
    color: '#263238'
  }
}
