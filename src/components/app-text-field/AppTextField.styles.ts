export const styles = {
  helperText: (multiline?: boolean) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    mr: multiline ? '75px' : '14px'
  })
}
