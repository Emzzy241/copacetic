export default function Layout(props) {
    // destructuring the children out from the props
    const { children } = props
    console.log(props)

    return (
        <>
            <header>
                <h1 className="text-gradient ">Copacetic</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <small>Created by</small>
                <a target="_blank" href="https://github.com/Emzzy241">
                    <img src="https://avatars.githubusercontent.com/u/87890470?s=400&u=5cd6ec2da85eb10d01c96a444f1fea83010d02a1&v=4" alt="pfp" />
                    <p>@Emzzy241</p>
                    <i className="fa-brands fa-github"></i>
                </a>
            </footer>
        </>
    )
}