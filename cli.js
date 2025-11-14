#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, 'profile.json');

const ANSIColors = {
  reset: '\u001b[0m',
  bold: '\u001b[1m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  gray: '\u001b[90m'
};

const LABEL_COLORS = {
  first:  ANSIColors.green,
  second: getBannerColorByT(0.5)
};

const ASCII_BANNER = [
// '██████╗ █████╗  ███╗   ███╗██╗██╗      █████╗     ██████╗  ██████╗ ███╗   ███╗██╗   ██╗ █████╗ ██╗     ██████╗  ██████╗ ',
// '██╔════╝██╔══██╗████╗ ████║██║██║     ██╔══██╗    ██╔══██╗██╔═══██╗████╗ ████║██║   ██║██╔══██╗██║     ██╔══██╗██╔═══██╗',
// '██║     ███████║██╔████╔██║██║██║     ███████║    ██████╔╝██║   ██║██╔████╔██║██║   ██║███████║██║     ██║  ██║██║   ██║',
// '██║     ██╔══██║██║╚██╔╝██║██║██║     ██╔══██║    ██╔══██╗██║   ██║██║╚██╔╝██║██║   ██║██╔══██║██║     ██║  ██║██║   ██║',
// '╚██████╗██║  ██║██║ ╚═╝ ██║██║███████╗██║  ██║    ██║  ██║╚██████╔╝██║ ╚═╝ ██║╚██████╔╝██║  ██║███████╗██████╔╝╚██████╔╝',
// ' ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ '
];

const ASCII_HW = [
  "                                                                                                                    ,---,  ",
  "        ,--,                                                                                                     ,`--.' |  ",
  "      ,--.'|            ,--,    ,--,                                                           ,--,              |   :  :  ",
  "   ,--,  | :          ,--.'|  ,--.'|                                                         ,--.'|         ,---,'   '  ;  ",
  ",---.'|  : '          |  | :  |  | :     ,---.                       .---.   ,---.    __  ,-.|  | :       ,---.'||   |  |  ",
  "|   | : _' |          :  : '  :  : '    '   ,'\\                     /. ./|  '   ,'\\ ,' ,'/ /|:  : '       |   | :'   :  ;  ",
  ":   : |.'  |   ,---.  |  ' |  |  ' |   /   /   |                 .-'-. ' | /   /   |'  | |' ||  ' |       |   | ||   |  '  ",
  "|   ' '  ; :  /     \\ '  | |  '  | |  .   ; ,. :                /___/ \\: |.   ; ,. :|  |   ,''  | |     ,--.__| |'   :  |  ",
  "'   |  .'. | /    /  ||  | :  |  | :  '   | |: :             .-'.. '   ' .'   | |: :'  :  /  |  | :    /   ,'   |;   |  ;  ",
  "|   | :  | '.    ' / |'  : |__'  : |__'   | .; :            /___/ \\:     ''   | .; :|  | '   '  : |__ .   '  /  |`---'. |  ",
  "'   : |  : ;'   ;   /||  | '.'|  | '.'|   :    |            .   \\  ' .\\   |   :    |;  : |   |  | '.'|'   ; |:  | `--..`;  ",
  "|   | '  ,/ '   |  / |;  :    ;  :    ;\\   \\  /___           \\   \\   ' \\ | \\   \\  / |  , ;   ;  :    ;|   | '/  '.--,_     ",
  ";   : ;--'  |   :    ||  ,   /|  ,   /  `----'/  .\\           \\   \\  |--\"   `----'   ---'    |  ,   / |   :    :||    |`.  ",
  "|   ,/       \\   \\  /  ---`-'  ---`-'         \\_ ; |           \\   \\ |                        ---`-'   \\   \\  /  `-- -`, ; ",
  "'---'         `----'                          /  ,\"             '---\"                                   `----'     '---`\"  ",
  "                                             '--'                                                                          ",
];

function readProfile() {
  try {
    const raw = fs.readFileSync(profilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`${ANSIColors.red}Error reading profile.json:${ANSIColors.reset} ${err.message || err}`);
    process.exit(1);
  }
}

function getMonoColor(t) {
  const v = Math.floor(50 + 180 * t);
  return getRGBToPrintANSIHW(v, v, v);
}

function getRGBToPrintANSIHW(r, g, b) {
  return `\u001b[38;2;${r};${g};${b}m`;
}

function printANSIHW() {
  ASCII_HW.forEach((ln, i) => {
    const t = i / (ASCII_HW.length - 1);
    const color = getMonoColor(t);
    console.log(`${color}${ANSIColors.bold}${ln}${ANSIColors.reset}`);
  });

  console.log('');
}

function getBannerColorByT(t) {
  const smooth = Math.pow(t, 1.4);

  const r = Math.floor(255 * smooth);
  const b = Math.floor(255 * (1 - smooth) * 0.9);

  return getRGBToPrintANSIHW(r, 0, b);
}

function printSection(title) {
  console.log(`\n${LABEL_COLORS.first}${title}:${ANSIColors.reset}`);
}

function padLabelFirst(label, pad = 1) {
  return `${LABEL_COLORS.first}${label.padEnd(pad)}${ANSIColors.reset}`;
}

function padLabelSecound(label, pad = 1) {
  return `${LABEL_COLORS.second}${label.padEnd(pad)}${ANSIColors.reset}`;
}

function printKV(label, value, level = 1, pad = 1) {
  let padFn;

  switch (level) {
    case 2:
      padFn = padLabelSecound;
      break;
    case 1:
    default:
      padFn = padLabelFirst;
  }

  console.log(`${padFn(label, pad)} ${value}`);
}

function makeCommaColorful(list, limit = 8) {
  if (!Array.isArray(list) || list.length === 0) return '';

  if (list.length > limit) {
    list = list.slice(0, limit);
    list.push(`+${list.length - limit} more`);
  }

  const commaColor = `${ANSIColors.red},${ANSIColors.reset}`;

  return list.map((item, i) => {
    const isLast = i === list.length - 1;
    return isLast ? item : `${item}${commaColor} `;
  }).join('');
}

function printTechnologies(tech) {
  if (!tech) return;

  console.log(`${ANSIColors.yellow}➨  ${ANSIColors.bold}Technologies${ANSIColors.reset}\n`);

  if (tech.code) printKV('Languages:', makeCommaColorful(tech.code), 1);

  if (tech.frontEnd) {
    console.log('');
    printSection('Front-end');
    if (tech.frontEnd.architecture)
      printKV('      Architecture:', makeCommaColorful(tech.frontEnd.architecture), 2);
    if (tech.frontEnd.bundlersAndBuild)
      printKV('      Build:', makeCommaColorful(tech.frontEnd.bundlersAndBuild), 2);
    if (tech.frontEnd.css)
      printKV('      Styling:', makeCommaColorful(tech.frontEnd.css), 2);
    if (tech.frontEnd.frameworks)
      printKV('      Frameworks:', makeCommaColorful(tech.frontEnd.frameworks), 2);
    if (tech.frontEnd.stateManagement)
      printKV('      State Management:', makeCommaColorful(tech.frontEnd.stateManagement), 2);
    if (tech.frontEnd.testing)
      printKV('      Testing:', makeCommaColorful(tech.frontEnd.testing), 2);
    if (tech.frontEnd.uiCharts)
      printKV('      Charts:', makeCommaColorful(tech.frontEnd.uiCharts), 2);
    if (tech.frontEnd.uiLibraries)
      printKV('      UI Libraries:', makeCommaColorful(tech.frontEnd.uiLibraries), 2);
  }

  if (tech.backEnd) {
    console.log('');
    printSection('Back-end');

    if (tech.backEnd.architecture)
      printKV('      Architecture:', makeCommaColorful(tech.backEnd.architecture), 2);

    if (tech.backEnd.java) {
      const java = tech.backEnd.java;
      printKV('      Java:', makeCommaColorful(tech.backEnd.java), 2);
      if (java.buildTools)
        printKV('           Build tools:', makeCommaColorful(java.buildTools), 2);
      if (java.frameworks)
        printKV('           Frameworks:', makeCommaColorful(java.frameworks), 2);
      if (java.libraries)
        printKV('           Libraries:', makeCommaColorful(java.libraries), 2);
      if (java.servers)
        printKV('           Servers:', makeCommaColorful(java.servers), 2);
      if (java.ui)
        printKV('           UI:', makeCommaColorful(java.ui), 2);
    }

    if (tech.backEnd.javascript) {
      const js = tech.backEnd.javascript;
      printKV('      Javascript:', makeCommaColorful(tech.backEnd.javascript), 2);
      if (js.runtime)
        printKV('           Runtime:', makeCommaColorful(js.runtime), 2);
      if (js.frameworks)
        printKV('           Frameworks:', makeCommaColorful(js.frameworks), 2);
    }
    if (tech.backEnd.testing)
      printKV('      Testing:', makeCommaColorful(tech.backEnd.testing), 2);
  }

  if (tech.authentication) {
    printSection('Authentication');
    if (tech.authentication.protocols)
      printKV('      Protocols:', makeCommaColorful(tech.authentication.protocols), 2);
    if (tech.authentication.providers)
      printKV('      Providers:', makeCommaColorful(tech.authentication.providers), 2);
    if (tech.authentication.standards)
      printKV('      Standards:', makeCommaColorful(tech.authentication.standards), 2);
    if (tech.authentication.tokens)
      printKV('      Tokens:', makeCommaColorful(tech.authentication.tokens), 2);
  }

  if (tech.mobile) {
    printSection('Mobile');
    if (tech.mobile.crossPlatform)
      printKV('      Cross-Platform:', makeCommaColorful(tech.mobile.crossPlatform), 2);
    console.log('')
  }

  if (tech.databases) printKV('Database:', makeCommaColorful(tech.databases), 1)
  console.log('')

  if (tech.testing) printKV('Testing:', makeCommaColorful(tech.testing), 1)
  console.log('')

  if (tech.toolsAndIDEs) printKV('Tools And IDEs:', makeCommaColorful(tech.toolsAndIDEs), 1)
  console.log('')

  if (tech.workflows) printKV('Workflows:', makeCommaColorful(tech.workflows), 1)

  if (tech.devOps) {
    printSection('DevOps');
    if (tech.devOps.containersAndInfra)
      printKV('      Containers And Infra:', makeCommaColorful(tech.devOps.containersAndInfra), 2);
    if (tech.devOps.deliveryAutomation)
      printKV('      Delivery Automation:', makeCommaColorful(tech.devOps.deliveryAutomation), 2);
    if (tech.devOps.observability)
      printKV('      Observability:', makeCommaColorful(tech.devOps.observability), 2);
    console.log('')
  }

  if (tech.operatingSystems) printKV('Operating Systems:', makeCommaColorful(tech.operatingSystems), 1)
  console.log('')

  if (tech.miscellaneous) printKV('Miscellaneous:', makeCommaColorful(tech.miscellaneous), 1)
  console.log('')

  if (tech.agil) printKV('Agile:', makeCommaColorful(tech.agil), 1)
}

function printContact(contact) {
  if (!contact) return;

  console.log(`\n${ANSIColors.yellow}➨  ${ANSIColors.bold}Hire Me!${ANSIColors.reset}\n`);

  if (contact.email) printKV('Email:', contact.email);
  if (contact.github) printKV('GitHub:', contact.github);
  if (contact.linkedin) printKV('LinkedIn:', contact.linkedin);

  console.log('');
}

const ASCII_CR = [
  ' /////////////\\\\  ',
  "(((((((((((((( \\\\ ",
  "))) ~~      ~~  ((( ",
  "((( (*)     (*) ))) ",
  ")))      <      ((( ",
  "((( '\\______/`  ))) ",
  ")))\\___________/((( ",
  "       _) (_        ",
  "      / \\_/ \\     ",
  "     /(     )\\     ",
  "    // )___( \\\\   ",
  "    \\\\(     )//   ",
  "     (       )      ",
  "      |  |  |       ",
  "       | | |        ",
  "       | | |        ",
  "      _|_|_|_       "
];

function printFooter() {
  console.log(`\n${ANSIColors.gray}Generated with ${ANSIColors.red}♥${ANSIColors.reset} — npx camilaromualdo${ANSIColors.reset}`);
  console.log('');
}

function showHelp() {
  console.log('Usage: npx camilaromualdo [--help] [--version]');
  console.log('');
  console.log('--help, -h      Show help');
  console.log('--version, -v   Show version');
  process.exit(0);
}

function showVersion() {
  try {
    const pkg = require(path.join(__dirname, 'package.json'));
    console.log(pkg.version || 'version unavailable');
  } catch {
    console.log('version unavailable');
  }
  process.exit(0);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) return showHelp();
  if (args.includes('--version') || args.includes('-v')) return showVersion();

  const profile = readProfile();

  printANSIHW();

  if (profile.name) console.log(`I'm, ${ANSIColors.bold}${profile.name},`);
  if (profile.bio) console.log(`${ANSIColors.bold}${profile.bio}${ANSIColors.reset}\n`);

  console.log(`Welcome to my CLI card — my digital business card in your terminal. ${ANSIColors.bold}${ANSIColors.reset}\n`);

  printTechnologies(profile.technologies);
  printContact(profile.contact);

  ASCII_CR.forEach(line => console.log(line));

  printFooter(profile);
}

main();