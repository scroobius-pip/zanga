import ImageKit from 'imagekit-javascript'
import ImageUploading from "react-images-uploading";
import { Container, Row, Col } from 'react-grid-system';
import { IconButton, Button } from 'evergreen-ui'

// var imagekit = new ImageKit({
//     publicKey: "your_public_api_key",
//     urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
//     authenticationEndpoint: "https://y-nu.now.sh/server.js",
// })

interface ImagePreviewProps {
    url: string
    // onClick: () => any
    // active: boolean
    onClick: () => any
    onDelete: () => any
}

const ImagePreview = (props: ImagePreviewProps) => {
    return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img
            // onClick={props.onClick}
            style={{
                borderRadius: '5px',
                width: '5em',
                height: '5em',
                marginTop: 12,
                opacity: .8,
                cursor: 'pointer'
            }}
            src={props.url}
        />
        <div style={{
            paddingLeft: 10,
            zIndex: 20,
            position: 'relative'
        }}>
            <IconButton intent='none' icon='edit' onClick={props.onClick} marginBottom={10} />
            <IconButton intent='danger' icon='delete' onClick={props.onDelete} />
        </div>


    </div>
}


interface Props {
    onChange: (images: Array<{
        dataURL: string
        file: File

    }>) => any
}

export default (props: Props) => {
    return <ImageUploading
        onChange={(files) => {
            props.onChange(files)
            console.log(files)
        }}
        multiple
        maxNumber={10}
        acceptType={['jpg', 'png', 'jpeg']}
        maxFileSize={5}
    >
        {
            ({ imageList, onImageUpload, errors }) => {
                console.log(errors)
                const RenderErrors = ({ errors }) => {

                    return <div style={{ color: 'red' }}>
                        {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                        {errors.acceptType && <span>Your selected file type is not allowed</span>}
                        {errors.maxFileSize && <span>Selected file size exceed 5mb</span>}
                    </div>


                }

                return <div className='container'>
                    <Button iconAfter='add' onClick={onImageUpload}>Upload Image</Button>
                    <Container fluid style={{ paddingLeft: 0 }}>
                        <Row
                            // gutterWidth={10}
                            align='start'
                            style={{ padding: 0, marginTop: 10 }}
                        >


                            {imageList.map(image => <Col
                                key={image.key}
                                xs={6}
                                sm={6}
                                lg={6}
                            >
                                <ImagePreview
                                    url={image.dataURL}
                                    onClick={image.onUpdate}
                                    onDelete={image.onRemove}
                                />
                            </Col>)
                            }
                        </Row>
                    </Container>
                    {hasError(errors) && <RenderErrors errors={errors} />}
                </div>
            }
        }
    </ImageUploading>
}

function hasError(obj) {
    for (var key in obj) {
        if (obj[key] === true) return true
    }
    return false;
}