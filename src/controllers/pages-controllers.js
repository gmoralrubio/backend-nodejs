export async function homePageController(req, res, next) {
	res.render('index.html', {
		title: 'Servidor HTTP básico',
		content:
			'Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health',
	})
}
