import styled from '@emotion/styled'

export const SongListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columnNumber }) => columnNumber}, 1fr);
  gap: ${({ gap }) => gap};
`
