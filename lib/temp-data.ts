
const projects = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    title: 'Automatic documentation for Polarity lang',
    description: 'My Bachelor Thesis',
    content: 'This thesis focuses on the automatic generation of HTML documentation for the experimental programming language Polarity. Polarity is built around the dual concepts of “data” and “codata” and combines both functional and object‐oriented programming paradigms. In particular, the work examines how Polarity source files can be parsed into an untyped syntax tree and then transformed—using Rust libraries such as pretty and Askama—into well‐structured, template‐based HTML pages. By separating content and presentation (via Askama templates and a central CSS stylesheet), the system produces a separate HTML document for each Polarity module, complete with syntax highlighting and hyperlinks.',
    image_url: '/documentation.PNG',
    link: 'https://github.com/Phil-Ebsworth/polarity',
  }
  ,
  {
    id: 'b2c1f8d3-4e5a-4c6b-9f0e-7c8d9e0f1a2b',
    title: 'Roboarena',
    description: 'A small, top-down roguelike approach.',
    content: 'RoboArena is a compact, top-down roguelike built collaboratively in Pygame. You pilot a customizable combat robot through procedurally generated arenas, battling waves of mechanized foes and navigating environmental hazards. Each run challenges you to scavenge parts, upgrade your arsenal, and adapt your playstyle—whether you favor rapid-fire energy bursts, precision sniper shots, or close-quarters melee strikes. Developed with a few friends, RoboArena blends fast-paced action, tight resource management, and pixel-art charm into bite-sized sessions that keep you coming back for “just one more run.”',
    image_url: '/roboarena.PNG',
    link: 'https://github.com/Phil-Ebsworth/Roboarena',
  },
  {
    id: 'c3d2f1e0-4b5a-4c6b-9f0e-7c8d9e0f1a2b',
    title: 'Tick-Tack-Toe',
    description: 'A simple Tic-Tac-Toe game built with React.',
    content: 'This is a simple Tic-Tac-Toe game built with React. It features a clean interface, responsive design, and allows two players to compete against each other. The game keeps track of the score and displays the winner at the end of each game.',
    image_url: '/tick-tack-toe.PNG',
    link: '/tick-tack-toe',
  },
]

export { projects};
