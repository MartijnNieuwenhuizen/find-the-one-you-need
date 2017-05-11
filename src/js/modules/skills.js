const Skills = {
  visualize: () => {

    const points = Array.from(document.querySelectorAll('.skill--score'));

    points.forEach(point => {
      const value = point.getAttribute('data-score');

      function color() {
        if (point.classList.contains('demo-fed')) {
          return '#F3B55B';
        } else if (point.classList.contains('demo-project')) {
          return '#84CBE7';
        }
      }


      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const size = 64;
      // const maxValue = 50;
      const maxValue = 100;

      // const fakeValue = Math.floor(Math.random() * (maxValue - 5 + 1) + 5);

      canvas.width = size;
      canvas.height = size;

      // let canvas rotate to 0%;
      ctx.translate( size / 2, size / 2 );
      ctx.rotate(-90 * Math.PI / 180);
      ctx.translate(-size / 2, -size / 2);

      // of the arc calculations
      const full = 2 * Math.PI; // the 100% of the circle
      const one = full / 100; // 1% of the circle
      const percentage = (value / maxValue) * 100; // percentage the circle needs to be drawn
      const endPoint = percentage * one; // value out of the percentage

      const x = 32;
      const y = 32;
      const r = 28;
      const startAngle = 0;
      const endAngle = endPoint;
      const anticlockwise = false;

      ctx.beginPath();
      ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
      ctx.strokeStyle = color();
      ctx.lineCap = 'round';
      ctx.lineWidth = 6;
      ctx.stroke();

      // point.innerHTML = value;

      point.appendChild(canvas);
    });
  }
};

module.exports = Skills;
