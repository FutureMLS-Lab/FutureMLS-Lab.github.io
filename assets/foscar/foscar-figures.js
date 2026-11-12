(() => {
  'use strict';

  // Reveal only the pre-written localized elements whose attribute matches the current state.
  const show = (root, attr, value) => {
    root.querySelectorAll(`[${attr}]`).forEach((el) => { el.hidden = el.getAttribute(attr) !== value; });
  };

  // Both figures use three steps and native buttons.
  const setup = (root, stepKey, render) => {
    if (!root) return;
    const play = root.querySelector('[data-play]');
    let timer;
    const stop = () => {
      clearTimeout(timer);
      delete root.dataset.playing;
    };
    const sync = () => {
      root.querySelectorAll('button[data-set]').forEach((button) => {
        const on = root.dataset[button.dataset.set] === button.dataset.value;
        button.setAttribute('aria-pressed', String(on));
      });
      render(root.dataset);
    };
    const advance = () => {
      const step = Number(root.dataset[stepKey]);
      if (step === 3) {
        stop();
        return;
      }
      root.dataset[stepKey] = String(step + 1);
      sync();
      timer = setTimeout(advance, 1800);
    };
    root.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || !root.contains(button)) return;
      if (button === play) {
        if (root.dataset.playing) {
          stop();
        } else {
          if (root.dataset[stepKey] === '3') root.dataset[stepKey] = '1';
          root.dataset.playing = 'true';
          sync();
          timer = setTimeout(advance, 1800);
        }
        return;
      }
      stop();
      if (button.dataset.set) root.dataset[button.dataset.set] = button.dataset.value;
      else if ('next' in button.dataset) root.dataset[stepKey] = String((Number(root.dataset[stepKey]) % 3) + 1);
      else return;
      sync();
    });
    sync();
    root.querySelectorAll('[data-figure-controls]').forEach((element) => { element.hidden = false; });
  };

  // Figure 4: accumulator fold when the shared axis is the reduction axis (QK+token, PV+channel).
  const fold = document.querySelector('[data-fold-figure]');
  setup(fold, 'step', (state) => {
    fold.dataset.fold = (state.product === 'qk') === (state.group === 'token') ? 'acc' : 'operand';
    show(fold, 'data-for-product', state.product);
    show(fold, 'data-case', `${state.product}-${state.group}`);
    show(fold, 'data-step-text', state.step);
  });

  // Figure 7: the stage highlight is pure CSS on data-stage; only the GPU panel is swapped.
  const pipeline = document.querySelector('[data-pipeline-figure]');
  setup(pipeline, 'stage', (state) => show(pipeline, 'data-gpu-panel', state.gpu));
})();
