import styled from 'styled-components'

export const GrayContainer = styled.div`
  background-color: ${props => (props.dark ? '#212121' : '#ffffff')};
  color: ${props => (props.dark ? '#ffffff' : ' #0f0f0f')};
`

export const FormDarkConrainer = styled.form`
  background-color: ${props => (props.dark ? '#181818' : '#ffffff')};
  color: ${props => (props.dark ? '#ffffff' : ' #0f0f0f')} !important;
`
export const DarkContainer = styled.div`
  background-color: ${props => (props.dark ? '#181818' : '#f9f9f9')};
  color: ${props => (props.dark ? '#ffffff' : ' #0f0f0f')} !important;
`
export const CustomInput = styled.input`
  color: ${props => (props.dark ? '#ffffff' : '#0f0f0f')};
  background-color: transparent;
  border: 1px solid ${props => (props.dark ? '#616e7c' : '#cbd5e1')};
  padding: 8px 16px;
  border-radius: 4px;
  outline: none;
  &::placeholder {
    color: ${props => (props.dark ? '#94a3b8' : '#7e858e')};
  }
`

export const DarkContainerTrending = styled.div`
  background-color: ${props => (props.dark ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.dark ? '#ffffff' : ' #0f0f0f')} !important;
  padding: 10px;
`

export const Banner = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  min-height: 200px;
  width: 100%;
`
export const LoginButton = styled.button`
  background-color: #3b82f6;
  border: none;
  padding: 10px;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 600;
`

export const VideoDetailsActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`
