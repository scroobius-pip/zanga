import { Text } from 'evergreen-ui'

interface Props {
    text: string
    fontSize?: number
    weight?: number
}

export default ({ text, fontSize = 600, weight = 600 }: Props) => {
    return <div
        style={{
            textDecoration: 'none',
            // lineHeight: 32,
            alignItems: 'center',
            fontSize: 16
        }}
    >
        <span

            className='underline-text'
            // paddingBottom={6}


            style={{
                paddingBottom: 6,
                // fontSize,]
                fontWeight: weight,
                textDecoration: 'none',
                width: 'calc(100%)',
                backgroundRepeat: 'no-repeat',
                transition: 'all 500ms cubic-bezier(0.23, 1, 0.32, 1)',
                backgroundPosition: '0 bottom, 0 bottom',

                backgroundImage: `
        linear-gradient(
            transparent calc(100% - 1px),
            #000000 1px
          ),
             linear-gradient(
            transparent calc(100% - 1px),
            #CBCBCB 1px
          )`,

            }}>
            {text}
        </span>
        <style jsx>
            {`

.underline-text {
    background-size: 0% 6px, 100% 6px;
    font-family: "SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.underline-text:hover {
    background-size: 100% 6px, 100% 6px;
}

`}
        </style>
    </div>
}