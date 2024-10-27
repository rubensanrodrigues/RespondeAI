FROM ubuntu:22.04

# export TZ=America/Sao_Paulo timezone
ENV TZ=America/Sao_Paulo

# Frontend
COPY frontend/build /RespondeAI/frontend

# Backend
COPY backend/run.py /RespondeAI/backend/run.py
COPY backend/app    /RespondeAI/backend/app
COPY backend/requirements.txt /requirements.txt

#configs
COPY start.sh /start.sh
COPY nginx/RespondeAI.conf /RespondeAI.conf

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime                                         \
    && echo $TZ > /etc/timezone                                                            \
    && apt-get update                                                                      \
    && apt-get -y install --no-install-recommends --no-install-suggests python3 pip nginx  \
    && python3 -m pip install -r /requirements.txt                                         \
    && rm /etc/nginx/sites-enabled/default                                                 \
    && mv /RespondeAI.conf /etc/nginx/sites-available/RespondeAI.conf                      \
    && ln -s /etc/nginx/sites-available/RespondeAI.conf /etc/nginx/sites-enabled/          \
    && apt-get purge -y --auto-remove pip                                                  \
    && rm -rf /var/lib/apt/lists/*                                                         \
    && rm -rf /etc/apt/sources.list.d/*.list                                               \
    && rm -f /requirements.txt

EXPOSE  80


ENTRYPOINT ["/start.sh"]

STOPSIGNAL SIGINT
