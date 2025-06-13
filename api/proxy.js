import webview

webview.create_window(
    'CGIS Canteen PoS',
    'https://kitsu.eu.pythonanywhere.com',
    width=1200,
    height=800,
    resizable=True,
    js_api=None
)

webview.start(debug=False)
