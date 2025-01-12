import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({name,time,image}) {
  return (
    <Card sx={{ width:{xs:160,sm:200,md:160,lg:180} }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="h2" sx={{ 
            fontSize:{lg:55, md:50,sm:40,xs:50},
            color: 'text.secondary' }}>
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}