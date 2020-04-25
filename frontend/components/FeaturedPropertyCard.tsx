import { Card, Pane, Heading, Text, Tooltip, IconButton, Paragraph, Icon, CardProps } from 'evergreen-ui'
import { colors } from '../styles'
import { Router } from 'next/router'
import Link from 'next/link'
import { Property } from './PropertyCard'
import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'


const Small = ({ description, id, images, location, price, title }: Property) => {
    return <div>
        <div
            className='featured-card'
            style={{
                width: '100%',
                position: 'relative',
            }}
        >

            <img
                width='100%'
                height='100%'
                style={{
                    borderRadius: 10,
                    // borderBottomLeftRadius: 0,
                    // borderBottomRightRadius: 0
                }}
                src={images[0]}
            />
            <Link
                href={'/property/' + id}
            >
                <button className='btn'
                    style={{
                        position: 'absolute',
                        transform: 'translate(-50%,-50%)',

                        left: '50%'
                    }}
                >
                    VIEW <span style={{ fontSize: '1.4em', marginLeft: '.4em', fontWeight: 800 }}>
                        →
                </span>
                </button>
            </Link>


            <style jsx>
                {`
                .featured-card >img {
                    filter: brightness(60%);
                    transition: all 0.2s linear;
                }

                .featured-card > .btn {
                    opacity:0;
                    top:52%;
                    transition: all 0.2s linear;
                }
               
                .featured-card:hover > .btn {
                    opacity:1;
                    top:50%;
                }
                .featured-card:hover >img {
                    filter: brightness(90%);
                }

                .btn{
                    border: 1px solid white;
                    border-radius: 50px;
                    background-color: transparent;
                    color: white;
                    padding: 12px 24px;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.2s linear;
                    letter-spacing: 0.08em;
                    font-weight:700;
                    font-family:"SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
                }
                
                .btn:hover {
                    background-color: white;
                    color:black;
                }
                
                `}
            </style>

        </div>
        <Card

            padding={20}
            textAlign='center'
            background='white'
            borderRadius={10}
            elevation={2}
        >
            <Heading fontWeight={700} size={600}>{title}</Heading>
            <Pane display='flex' alignSelf='center' justifyContent='center' marginTop={10} flexDirection='row' alignItems='center' >
                <Icon icon="map-marker" color={colors.grey} marginRight={5} size={16} />
                <Text size={600} fontWeight={500}>{location}</Text>
            </Pane>
            <Paragraph size={500}>
                {description}
            </Paragraph>
            <Heading padding={2} size={700}>{price}</Heading>
        </Card>
    </div>


}

const Large = ({ title, id, images, price, location, description }: Property) => {

    const [image, setImage] = useState(images[0])
    interface ImagePreviewProps {
        url: string
        // onClick: () => any
        active: boolean
    }

    const ImagePreview = (props: ImagePreviewProps) => {
        return <img
            onClick={(e) => { e.preventDefault(); setImage(props.url) }}
            style={{
                borderRadius: '5px',
                width: '5em',
                height: '5em',
                marginTop: 12,
                opacity: !props.active && .6,
                cursor: 'pointer'
            }}
            src={props.url}
        />
    }


    return <Card
        display='flex'
        backgroundColor='white'
        maxWidth={1000}
        borderRadius={10}
        maxHeight={400}
        // elevation={2}
        minHeight={350}
    >
        <div
            className='card-details'
            style={{
                flex: '2',
                padding: 50,
                overflowX: 'hidden'
            }}

        >
            <Heading fontWeight={700} size={700} marginBottom={20}>{title}</Heading>
            <Pane marginBottom={20} display='flex' alignSelf='center' flexDirection='row' alignItems='center' >
                <Icon icon="map-marker" marginRight={5} size={16} />
                <Text size={600} fontWeight={500}>{location}</Text>
            </Pane>
            <Paragraph size={500} marginTop={10}>
                {description}
            </Paragraph>
            <Pane
                display='flex'
                marginTop={20}

                flexDirection='row'
                // display='flex'
                whiteSpace='nowrap'
                overflowY='auto'
            >
                <Container fluid style={{ paddingLeft: 0 }}>
                    <Row
                        gutterWidth={10}
                        align='center'
                        style={{ padding: 0, marginTop: 10 }}
                    >
                        {
                            images.map(url => <Col

                                xs={4}
                                sm={4}
                                lg={4}
                            >
                                <ImagePreview
                                    url={url}
                                    active={url === image}
                                />
                            </Col>)
                        }
                    </Row>
                </Container>

            </Pane>
            <Heading padding={2} size={700}>{price}</Heading>
            <style jsx>
                {`
  .card-details::-webkit-scrollbar {
    width: 0px; 
    }
`}
            </style>
        </div>
        <Pane flex='4'>
            <div
                className='card-image'
                style={{

                    width: '100%',
                    position: 'relative',
                    height: '100%'

                }}
            >

                <img
                    width='100%'
                    height='100%'
                    style={{
                        backgroundSize: 'contain',
                        borderRadius: 10,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,

                        height: '100%'
                    }}
                    src={image}
                />
                <Link
                    href={'/property/' + id}
                >
                    <button className='btn'
                        style={{
                            position: 'absolute',
                            transform: 'translate(-50%,-50%)',

                            left: '50%'
                        }}
                    >
                        VIEW <span style={{ fontSize: '1.4em', marginLeft: '.4em', fontWeight: 800 }}>
                            →
                </span>
                    </button>
                </Link>


                <style jsx>
                    {`

               

                .card-image >img {
                    filter: brightness(60%);
                    transition: all 0.2s linear;
                }

                .card-image > .btn {
                    opacity:0;
                    top:52%;
                    transition: all 0.2s linear;
                }
               
                .card-image:hover > .btn {
                    opacity:1;
                    top:50%;
                }
                .card-image:hover >img {
                    filter: brightness(90%);
                }

                .btn{
                    border: 1px solid white;
                    border-radius: 50px;
                    background-color: transparent;
                    color: white;
                    padding: 12px 24px;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.2s linear;
                    letter-spacing: 0.08em;
                    font-weight:700;
                    font-family:"SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
                }
                
                .btn:hover {
                    background-color: white;
                    color:black;
                }
                
                `}
                </style>
            </div>
        </Pane>

    </Card>


}


export default { Small, Large }