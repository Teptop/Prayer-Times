import './App.css'
 import MainContent from './Components/MainContent'
import Container from '@mui/material/Container';


function App() {

  return (
    <>
    
    {/* <Box
        sx={{
          margin:'auto',
          width: {
            xs: 100, // 0
            sm: 200, // 600 
            md: 300, // 900
            lg: 400, // 1200
            xl: 500, // 1536
          },
          height: 300,
          borderRadius: 1,
          bgcolor: 'primary.main',
        }}
      /> */}
    
     <div 
       style={{
        display:'flex',
        justifyContent:'center',
        width:'100vw',
       }}>
        <Container maxWidth="lg">
        <MainContent/>
        </Container>
    
    </div>
    </>
  )
}

export default App
