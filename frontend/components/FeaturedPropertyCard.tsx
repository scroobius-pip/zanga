import { Card, Pane, Heading, Text, Tooltip, IconButton, Paragraph } from 'evergreen-ui'
import { colors } from '../styles'
import { Router } from 'next/router'
import copyPropertyLink from '../functions/copyPropertyLink'
import Link from 'next/link'

export default () => {
    return <div>
        <div
            className='featured-card'
            style={{
                width: 400,
                position: 'relative',
                // height: 600
                marginBottom: 100
            }}
        >

            <img
                width='100%'
                height='100%'
                style={{
                    borderRadius: 10
                }}
                src="https://is1-3.housingcdn.com/4f2250e8/f37b0ec815585f31fa77f299085b55af/v0/medium/konark_meadows-shahad-mumbai-atlanta_landmark.jpeg"
            />
            <Link
                href='/property/257999739274920467'
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

            <Card
                elevation={4}
                // hoverElevation={4}
                position='absolute'
                top='100%'
                left='49.5%'
                width={'95%'}
                transform='translate(-50%, -50%)'
                // margin='auto'
                padding={20}
                zIndex={10}
                background='white'
                borderRadius={10}
                borderLeft
                borderLeftWidth={5}
                borderLeftColor={colors.grey}

            >
                <Heading fontWeight={700} size={700}>Duplex for sale at Kuje,Fct</Heading>
                <Paragraph size={500} marginTop={10}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque perspiciatis laudantium blanditiis aliquam, distinctio ullam.
                </Paragraph>
            </Card>
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
    </div>


}
