function NavigationBreadCrumb({thisStep}) {
    return (
        // Je met en gras le lien de la page courante grâce à la props thisStep
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Type de profil</a></li>
                <li className="breadcrumb-item"><a href="#">Informations générales</a></li>
                <li className="breadcrumb-item active" aria-current="page">{thisStep}</li>
            </ol>
        </nav>
    )
}

export default NavigationBreadCrumb;