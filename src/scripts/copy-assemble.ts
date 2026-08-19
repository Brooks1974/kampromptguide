export function assemble(box: HTMLElement): string {
  let text = '';
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent ?? '';
      return;
    }
    if (node instanceof HTMLInputElement) {
      text += node.value || node.dataset.sample || node.dataset.placeholder || '';
      return;
    }
    node.childNodes.forEach(walk);
  };
  walk(box);
  return text;
}

export async function copyText(text: string, button: HTMLButtonElement): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }

  const previous = button.textContent;
  button.textContent = 'Copied';
  button.dataset.copied = 'true';
  window.setTimeout(() => {
    button.textContent = previous;
    delete button.dataset.copied;
  }, 1600);
}

export function bindCopy(root: ParentNode = document): void {
  root.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLButtonElement>('[data-copy]');
    if (!button) return;
    const box = button.closest('.prompt-box')?.querySelector<HTMLElement>('[data-assemble]');
    if (!box) return;
    await copyText(assemble(box), button);
  });

  root.addEventListener('input', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.classList.contains('slot')) return;
    input.size = Math.max(input.value.length, 8);
  });
}
