FROM docker.io/ajay2307/minimal-nb:v2

USER root

# # Install all OS dependencies for fully functional notebook server
# RUN apt-get update && apt-get install -yq --no-install-recommends \
#     build-essential \
#     emacs \
#     git \
#     inkscape \
#     jed \
#     libsm6 \
#     libxext-dev \
#     libxrender1 \
#     lmodern \
#     netcat \
#     pandoc \
#     python-dev \
#     texlive-fonts-extra \
#     texlive-fonts-recommended \
#     texlive-generic-recommended \
#     texlive-latex-base \
#     texlive-latex-extra \
#     texlive-xetex \
#     tzdata \
#     unzip \
#     nano \
#     && rm -rf /var/lib/apt/lists/*

#Custom hub extension 
RUN cd $CONDA_DIR
RUN conda install git
RUN git clone https://github.com/drajanikant/hub-extension.git 
RUN jupyter labextension install ./hub-extension


# Install git extension
RUN jupyter labextension install @jupyterlab/git
RUN pip install jupyterlab_git
RUN jupyter serverextension enable --py jupyterlab_git


# #Install memory extension
# container extension
RUN jupyter labextension install jupyterlab-topbar-extension
# system metrics
RUN jupyter labextension install jupyterlab-system-monitor
RUN pip install nbresuse
    
# custom text in the top bar
RUN jupyter labextension install jupyterlab-topbar-text

# Switch back to iventura to avoid accidental container runs as root
USER $NB_UID