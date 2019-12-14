export default (token: string) => {
    if (typeof document !== 'undefined')
        document.cookie = `token=${token};path=/; max-age=2841782400;`
}