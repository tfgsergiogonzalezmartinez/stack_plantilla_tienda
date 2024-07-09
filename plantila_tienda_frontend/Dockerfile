
FROM node:20-alpine as angular

ARG IP_FRONT
ENV ENV_IP_FRONT=${IP_FRONT}

ARG Moneda
ARG Titulo
ARG Logo_Extension
ARG Color_background
ARG Color_background_light
ARG Color_background_dark
ARG Color_items
ARG Color_items_light
ARG Color_items_dark
ARG Color_texto
ARG Color_texto_light
ARG Color_texto_dark
ARG Color_boton
ARG Color_boton_light
ARG Color_boton_dark
ARG Color_header
ARG Color_header_light
ARG Color_header_dark
ARG Color_subHeader
ARG Color_subHeader_light
ARG Color_subHeader_dark
ARG Color_texto_botones

ENV ENV_Moneda=${Moneda}
ENV ENV_Titulo=${Titulo}
ENV ENV_Logo_Extension=${Logo_Extension}
ENV ENV_Color_background=${Color_background}
ENV ENV_Color_background_light=${Color_background_light}
ENV ENV_Color_background_dark=${Color_background_dark}
ENV ENV_Color_items=${Color_items}
ENV ENV_Color_items_light=${Color_items_light}
ENV ENV_Color_items_dark=${Color_items_dark}
ENV ENV_Color_texto=${Color_texto}
ENV ENV_Color_texto_light=${Color_texto_light}
ENV ENV_Color_texto_dark=${Color_texto_dark}
ENV ENV_Color_boton=${Color_boton}
ENV ENV_Color_boton_light=${Color_boton_light}
ENV ENV_Color_boton_dark=${Color_boton_dark}
ENV ENV_Color_header=${Color_header}
ENV ENV_Color_header_light=${Color_header_light}
ENV ENV_Color_header_dark=${Color_header_dark}
ENV ENV_Color_subHeader=${Color_subHeader}
ENV ENV_Color_subHeader_light=${Color_subHeader_light}
ENV ENV_Color_subHeader_dark=${Color_subHeader_dark}
ENV ENV_Color_texto_botones=${Color_texto_botones}


WORKDIR /home/app
COPY package*.json .
RUN npm ci
COPY . .
RUN if [ -f Enviroment.ts ]; then rm Enviroment.ts; fi
RUN echo "Archivo Environment.ts eliminado (si existía)"

RUN echo "export const Enviroment = { \
  BACKEND_URL : '${ENV_IP_FRONT}', \
  BACKEND_API_URL : '${ENV_IP_FRONT}/api/', \
  PAGE_ICON : 'assets/img/Logo.png', \
  Titulo : '${ENV_Titulo}', \
  Moneda : '${ENV_Moneda}', \
  Logo_Extension : '${ENV_Logo_Extension}', \
};" > Enviroment.ts
RUN echo "Archivo environment.ts creado con variables de entorno"
RUN chmod 777 Enviroment.ts

RUN echo "/* You can add global styles to this file, and also import other style files */ \
  /* You can add global styles to this file, and also import other style files */ \
  @tailwind base; \
  @tailwind components; \
  @tailwind utilities; \
  @layer base { \
    :root { \
      --text: ${ENV_Color_texto}; \
      --background: ${ENV_Color_background}; \
      --primary: ${ENV_Color_boton}; \
      --secondary: #fcb42f; \
      --accent: #2802ff; \
      --card: #3446cc8a; \
      --item: ${ENV_Color_items}; \
      --header: ${ENV_Color_header}; \
      --subheader: ${ENV_Color_subHeader}; \
      /* Tonalidades suaves */ \
      --text-light: ${ENV_Color_texto_light}; \
      --background-light: ${ENV_Color_background_light}; \
      --primary-light: ${ENV_Color_boton_light}; \
      --secondary-light: rgb(247, 200, 114); \
      --accent-light: #4727fa; \
      --card-light: #707ac9c0; \
      --item-light: ${ENV_Color_items_light}; \
      --header-light: ${ENV_Color_header_light}; \
      --subheader-light: ${ENV_Color_subHeader_light}; \
      /* Tonalidades fuertes */ \
      --text-dark: ${ENV_Color_texto_dark}; \
      --background-dark: ${ENV_Color_background_dark}; \
      --primary-dark: ${ENV_Color_boton_dark}; \
      --secondary-dark: rgb(211, 139, 4); \
      --accent-dark: #1f01ca; \
      --card-dark: #1727a18a; \
      --item-dark: ${ENV_Color_items_dark}; \
      --header-dark: ${ENV_Color_header_dark}; \
      --subheader-dark: ${ENV_Color_subHeader_dark}; \
      --text-button: ${ENV_Color_texto_botones}; \
      --border: #bfbfc2e3; \
      --enlaces-hover: #2b4feea8; \
    } \
    .dark { \
      --text: #e6e8f9; \
      --background: #0c112e; \
      --primary: #fcb42f; \
      --secondary: #4767f5e5; \
      --accent: #ffd000; \
      --card: #2a4bade5; \
      /* Tonalidades suaves */ \
      --text-light: #eff1fb; \
      --background-light: #1d285f; \
      --primary-light: #fabf50; \
      --secondary-light: #6881f0e5; \
      --accent-light: #ffc352; \
      --card-light: #5066a893; \
      /* Tonalidades fuertes */ \
      --text-dark: #b9bce1; \
      --background-dark: #090d22; \
      --primary-dark: #f8a203; \
      --secondary-dark: #143cf1e5; \
      --accent-dark: #d4ae04; \
      --card-dark: #193daa93; \
      --text-button: #000000; \
      --header: #2b4eee; \
      --border: #202749; \
      --enlaces-hover: #fcb42fd3; \
    } \
  } \
  body { \
    margin: 0; \
    padding: 0; \
  } \
  header { \
    background-color: var(--background); \
    box-shadow: 0 4px 2px rgba(5, 5, 5, 0.24); \
    height: 70px; \
    color: var(--text-button); \
    text-align: center; \
    transition: height 0.3s ease, box-shadow 0.3s ease; \
  } \
  header.expanded { \
    height: 350px; /* Altura expandida */ \
  } \
  /* Estilos para encabezados en modo claro */ \
  h1 { \
    color: var(--text); \
    font-size: 2.5em; \
    /* margin: 0.67em 0; */ \
  } \
  h2 { \
    color: var(--text-light); \
    font-size: 2em; \
    /* margin: 0.75em 0; */ \
  } \
  h3 { \
    color: var(--text-light); \
    font-size: 1.75em; \
    /* margin: 0.83em 0; */ \
  } \
  h4 { \
    color: var(--text); \
    font-size: 1.5em; \
    /* margin: 1.12em 0; */ \
  } \
  h5 { \
    color: var(--text-light); \
    font-size: 1.25em; \
    /* margin: 1.5em 0; */ \
  } \
  h6 { \
    color: var(--text-light); \
    font-size: 1em; \
    /* margin: 1.67em 0; */ \
  } \
  /* Estilos para párrafos en modo claro */ \
  p { \
    color: var(--text); \
    font-size: 1em; \
    line-height: 1.6; \
    margin: 1em 0; \
  } \
  ul, ol { \
    color: var(--text); \
    margin: 1em 0; \
    padding-left: 2em; \
    list-style-type: disc; \
    /* Asegura que se muestren los puntos */ \
  } \
  ul::marker, ol::marker { \
    color: var(--accent); \
    /* Cambia a tu color deseado */ \
  } \
  li { \
    margin-bottom: 0.5em; \
  } \
  code { \
    color: var(--text); \
    background-color: var(--background-light); \
    padding: 0.25em 0.5em; \
    border-radius: 5px; \
  } \
  /* Estilos para blockquote en modo claro */ \
  blockquote { \
    color: var(--text-light); \
    border-left: 4px solid var(--primary); \
    padding-left: 1em; \
    margin: 1em 0; \
    font-style: italic; \
    background-color: var(--card-light); \
    padding: 1em; \
  } \
  /* Estilos para botones en modo claro */ \
  button { \
    background-color: var(--primary); \
    color: var(--text-button); \
    padding: 0.5em 1em; \
    border: none; \
    border-radius: 5px; \
    cursor: pointer; \
    font-size: 1em; \
  } \
  button:hover { \
    background-color: var(--primary-light); \
  } \
  /* Estilo para las tarjetas (cards) */ \
  .card { \
    background-color: var(--card); \
    border-radius: 10px; \
    box-shadow: 0 4px 2px rgba(5, 5, 5, 0.24); \
    padding: 15px; \
    color: var(--text); \
    transition: transform 0.3s, box-shadow 0.3s; \
  } \
  .card:hover { \
    transform: translateY(-5px); \
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.459); \
  } \
  /* Responsividad para las tarjetas */ \
  @media (max-width: 768px) { \
    .card { \
      padding: 15px; \
      margin: 15px 0; \
    } \
  } \
  @media (max-width: 480px) { \
    .card { \
      padding: 10px; \
      margin: 10px 0; \
    } \
  } \
  /* Asegurar que el diseño sea responsivo */ \
  @media (max-width: 768px) { \
    h1 { \
      font-size: 2em; \
    } \
    h2 { \
      font-size: 1.75em; \
    } \
    h3 { \
      font-size: 1.5em; \
    } \
    h4 { \
      font-size: 1.25em; \
    } \
    h5 { \
      font-size: 1em; \
    } \
    h6 { \
      font-size: 0.875em; \
    } \
  } \
  /* Editor */ \
  .element-selected { \
    border: 1px solid blue; \
    /* background-color: lightblue; */ \
  } \
  .element-hover { \
    background-color: rgba(42, 61, 228, 0.288); \
  }" > styles.css

RUN cp styles.css docker-entrypoint.d
RUN mv styles.css src/styles.css
RUN chmod 777 src/styles.css


RUN npm run build -- --configuration=production

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=angular /home/app/dist/plantilla_tienda_frontend/browser .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R +rx *
EXPOSE 80
# CMD [ "tail", "-f", "/dev/null" ]
