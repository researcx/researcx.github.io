function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    var_locale = data.getAll("vars")[0]
    var_editor = data.getAll("vars")[1]
    var_shell = data.getAll("vars")[2]
    var_prompt_fg = data.getAll("vars")[3]
    var_prompt_bg = data.getAll("vars")[4]
    var_tmux_fg = data.getAll("vars")[5]
    var_tmux_bg = data.getAll("vars")[6]
    var_snapd_path = data.getAll("vars")[7]
    var_miniconda_path = data.getAll("vars")[8]
    
var fish_config = ''
var fish_config_greeting = `function fish_greeting
end

`
var fish_config_homebrew = `# homebrew
set -gx PATH /opt/homebrew/bin $PATH
`
var fish_config_homebrew_python = `
# python3.x on homebrew
set -gx PATH /opt/homebrew/opt/python@3/bin $PATH
`
var fish_config_minconda = `
# miniconda
set -gx PATH ` + var_miniconda_path + ` $PATH
`
var fish_config_snapd = `
# snapd
set -gx PATH  ` + var_snapd_path + `  $PATH
`
var fish_config_editor = `set -gx EDITOR ` + var_editor + `

`
var fish_config_locale = `set LC_ALL ` + var_locale + `
set LANG ` + var_locale + `
set LANGUAGE ` + var_locale + `

`
var fish_config = fish_config + `
alias ssh-anon='ssh -o "StrictHostKeyChecking=no" -o "UserKnownHostsFile=/dev/null" -o "IdentitiesOnly=yes" -o "IdentityFile=/dev/null" -o "PubkeyAuthentication=no"'
alias git-tor='git -c http.sslVerify=false -c remote.origin.proxy=socks5h://127.0.0.1:9050'
alias git-i2p='git -c http.sslVerify=false -c remote.origin.proxy=socks5h://127.0.0.1:4444'
alias git-invalidssl='git -c http.sslVerify=false'

alias psg="ps aux | grep"
alias hsg="history | grep"

alias ls='ls -haltr --color=auto'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias findin='egrep -rl'
alias cp='cp -v'
alias rm='rm -v --preserve-root'
alias nano='nano -w'
`
var fish_config_time_funcs_mac = `
# MacOS
alias unixtime='date +%s'
alias unixfilename='echo "(date '+%s')""(jot -r 1 100 999)"'
alias unixtimetodate='date -j -f %s'
alias bmt='set _BTV (date '+%s'); echo "($_BTV+3600)%86400/86.4" | bc'
`
var fish_config_time_funcs_linux = `
# Linux
alias unixtime='date +%s'
alias unixfilename='echo (date '+%s')(seq -w 0 999 | shuf)[1]'
function unixtimetodate
    date -d @$argv
end
alias bmt='set _BTV (date '+%s'); echo "($_BTV+3600)%86400/86.4" | bc'
`
var fish_config_tmux = `
alias tl='tmux ls' # list sessions
alias ta='tmux attach' # attach
alias tad='tmux attach -d' # attach and detatch existing clients
alias tat='tmux a -t' # tat <session> # attach to named session
alias tan='tmux new -s' # tan <session> # create new named session
alias tkill='tmux kill-session -t' # tkill <session> # kill a named session
`
var fish_config_git = `
alias ga='git add'
alias gp='git push'
alias gl='git log'
alias gs='git status'
alias gd='git diff'
alias gdc='git diff --cached'
alias gm='git commit -m'
alias gma='git commit -am'
alias gb='git branch'
alias gc='git checkout'
alias gra='git remote add'
alias grr='git remote rm'
alias gpu='git pull'
alias gcl='git clone'
`
var fish_config_proxmox = `
# Proxmox
alias shell="pct enter"
function shell-tmux
    pct exec $argv -- bash -c 'tmux'
end
function shell-tmux-attach
    pct exec $argv -- bash -c 'tmux attach'
end
alias containers="pct list | grep running; pct list | grep stopped"
`
var fish_config_systemd = `
# systemd
function start
    service $argv start
end
function restart
    service $argv restart
end
function stop
    service $argv stop
end
alias jctl='journalctl -xe'
alias state='systemctl status'
alias enable='systemctl enable --now'
alias disable='systemctl disable --now'
`
var fish_config_openrc = `
# openrc
function start
    rc-service $argv start
end
function restart
    rc-service $argv restart
end
function stop
    rc-service $argv stop
end
function state
    rc-service $argv state
end
alias jctl='tail -n 2000 /var/log/messages'
function enable
    rc-update add $argv
end
function disable
    rc-update del $argv
end
`
var fish_config_brew_services = `
# brew services
function start
    brew services start $argv
end
function restart
    brew services restart $argv
end
function stop
    brew services stop $argv
end
`
var fish_config_iptables_tor_toggle = `
# iptables
alias tor-on='/usr/sbin/iptables-restore /etc/iptables/rules.v4; /usr/bin/sh /etc/iptables/tor.v4.sh'
alias tor-off='/usr/sbin/iptables-restore /etc/iptables/rules.v4'
`
var fish_config_custom_prompt = `
function prompt_login --description "display user name for the prompt"
    set -l textfg ` + var_prompt_fg + `
    set -l textbg ` + var_prompt_bg + `
    if not set -q __fish_machine
        set -g __fish_machine
        set -l debian_chroot $debian_chroot

        if test -r /etc/debian_chroot
            set debian_chroot (cat /etc/debian_chroot)
        end

        if set -q debian_chroot[1]
            and test -n "$debian_chroot"
            set -g __fish_machine "(chroot:$debian_chroot)"
        end
    end

    # Prepend the chroot environment if present
    if set -q __fish_machine[1]
        echo -n -s (set_color yellow) "$__fish_machine" (set_color normal) ' '
    end

    # If we're running via SSH, change the host color.
    set -l color_host $fish_color_host
    if set -q SSH_TTY; and set -q fish_color_host_remote
        set color_host $fish_color_host_remote
    end
    set_color $textfg -b $textbg
    echo -n [(prompt_hostname)]
    set_color normal -b normal
    echo -n " "
    echo -n -s (set_color $fish_color_user) "$USER" (set_color normal)
end
`

var tmux_config_generated = `set -g mouse on
set -g base-index 1
set -g prefix C-b
set -g escape-time 0
set -g automatic-rename on
#set -g allow-rename off
set -g renumber-windows on
set -g default-shell #` + var_shell + `
set -g default-terminal "xterm-256color"

set -g monitor-activity off
set -g visual-activity on
set -g visual-bell off

set -g bell-action other
set -g mode-keys vi

set -g set-titles on
set -g set-titles-string  "#S:#I:#W - \\"#T\\""

set -g status on
set -g status-position top
set -g status-left "#[fg=` + var_tmux_fg + `,bg=` + var_tmux_bg + `][#(hostname -s)]#[default]"
set -g status-right "%H:%M"

set -g status-interval 10
set -g status-justify centre
set -g window-status-separator ' '

set -g status-left-length 20
set -g status-right-length 20

set -g aggressive-resize on

set -g status-style bg=default,fg=colour136
set -g window-status-current-style fg=yellow

set -g display-panes-active-colour colour166
set -g display-panes-colour colour33

set -g clock-mode-colour red

bind-key h select-pane -L
bind-key j select-pane -D
bind-key k select-pane -U
bind-key l select-pane -R

bind-key m set-window-option main-pane-height 60\\; select-layout main-horizontal

bind-key C command-prompt -p "Name of new window: " "new-window -n '%%'"

bind-key r source-file ~/.tmux.conf \\; display-message "Config reloaded..."`


    //console.log(data.getAll("selections"))

    var fish_config_generated = ''

    if (data.getAll("selections").includes("hide-greeting")) {
        fish_config_generated = fish_config_generated + fish_config_greeting
    }

    fish_config_generated = fish_config_generated + fish_config_editor

    fish_config_generated = fish_config_generated + fish_config_locale

    if (data.getAll("selections").includes("homebrew")) {
        fish_config_generated = fish_config_generated + fish_config_homebrew
    }

    if (data.getAll("selections").includes("homebrew-python")) {
        fish_config_generated = fish_config_generated + fish_config_homebrew_python
    }

    if (data.getAll("selections").includes("miniconda")) {
        fish_config_generated = fish_config_generated + fish_config_minconda
    }

    if (data.getAll("selections").includes("snapd")) {
        fish_config_generated = fish_config_generated + fish_config_snapd
    }

    fish_config_generated = fish_config_generated + fish_config

    if (data.getAll("selections").includes("homebrew")) {
        fish_config_generated = fish_config_generated + fish_config_time_funcs_mac
    }else{
        fish_config_generated = fish_config_generated + fish_config_time_funcs_linux
    }

    if (data.getAll("selections").includes("tmux")) {
        fish_config_generated = fish_config_generated + fish_config_tmux
    }

    if (data.getAll("selections").includes("git")) {
        fish_config_generated = fish_config_generated + fish_config_git
    }

    if (data.getAll("selections").includes("proxmox")) {
        fish_config_generated = fish_config_generated + fish_config_proxmox
    }

    if (data.getAll("selections").includes("systemd")) {
        fish_config_generated = fish_config_generated + fish_config_systemd
    }

    if (data.getAll("selections").includes("homebrew")) {
        fish_config_generated = fish_config_generated + fish_config_brew_services
    }

    if (data.getAll("selections").includes("openrc")) {
        fish_config_generated = fish_config_generated + fish_config_openrc
    }

    if (data.getAll("selections").includes("iptables-tor")) {
        fish_config_generated = fish_config_generated + fish_config_iptables_tor_toggle
    }

    if (data.getAll("selections").includes("custom-prompt")) {
        fish_config_generated = fish_config_generated + fish_config_custom_prompt
    }

    document.getElementById('fish_config').innerHTML = fish_config_generated;
    if (data.getAll("selections").includes("tmux")) {
        document.getElementById('tmux_config').innerHTML = tmux_config_generated;
    }
    document.querySelectorAll('.editing').forEach((block) => {
        console.log(block)
        block.removeAttribute('data-highlighted');
        hljs.highlightElement(block);
        hljs.lineNumbersBlock(block);
    });
}

const itemsTable = document.querySelector('.tickboxes');
const items = document.querySelectorAll('.selections'); // Class of each item

function regenerate(){
    document.getElementsByTagName('input')[21].click();
}

itemsTable.addEventListener('click', (e) => { 
  const target = e.target.id;
  document.getElementsByTagName('input')[21].click();
  //console.log(document.getElementsByTagName('input'))
  if(target == 'miniconda') {
    toggle(target + "_field")
  }
  if(target == 'snapd') {
    toggle(target + "_field")
  }
  if(target == 'custom-prompt') {
    toggle(target + "_field")
  }
  if(target == 'tmux') {
    toggle(target + "_field")
    toggle(target + "_col_field")
    toggle(target + "_shell_field")
  }
  if(target == 'homebrew') {
    toggle("neofetch_macos_field")
    toggle("neofetch_linux_field")
  }
})

function toggle(id) {
    var element = document.getElementById(id);

    if (element) {
        var display = element.style.display;
        if (display == "none") {
            element.style.display = "inline";
        } else {
            element.style.display = "none";
        }
    }
}
