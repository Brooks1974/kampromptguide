function slotValue(input: HTMLInputElement): string {
  const filled = input.value.trim();
  return filled || input.dataset.placeholder || `[${input.dataset.slot ?? input.dataset.fillField ?? ''}]`;
}

export function assemble(box: HTMLElement): string {
  let text = '';
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent ?? '';
      return;
    }
    if (node instanceof HTMLInputElement) {
      text += slotValue(node);
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

function syncFill(scope: ParentNode, key: string, value: string, source: HTMLInputElement): void {
  const fields = scope.querySelectorAll<HTMLInputElement>(`[data-fill-field="${key}"], [data-slot="${key}"]`);
  for (const field of fields) {
    if (field === source) continue;
    field.value = value;
    if (field.classList.contains('slot')) {
      const fallback = field.dataset.placeholder ?? key;
      const width = Math.max((value || fallback).length, 8);
      field.size = width;
      field.style.minWidth = `${width}ch`;
    }
  }
}

export function bindCopy(root: ParentNode = document): void {
  root.addEventListener('submit', (event) => {
    const form = event.target;
    if (form instanceof HTMLFormElement && form.matches('[data-fill-form]')) {
      event.preventDefault();
    }
  });

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
    if (!(input instanceof HTMLInputElement)) return;

    const key = input.dataset.fillField || input.dataset.slot;
    if (key) {
      const scope = input.closest('[data-fill]') ?? root;
      syncFill(scope, key, input.value, input);
    }

    if (input.classList.contains('slot')) {
      const fallback = input.dataset.placeholder ?? input.dataset.slot ?? '';
      const width = Math.max((input.value.trim() || fallback).length, 8);
      input.size = width;
      input.style.minWidth = `${width}ch`;
    }
  });
}
