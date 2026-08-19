function placeholderOf(input: HTMLInputElement): string {
  return input.dataset.placeholder || `[${input.dataset.slot ?? input.dataset.fillField ?? ''}]`;
}

function isEmptySlot(input: HTMLInputElement): boolean {
  const filled = input.value.trim();
  return !filled || filled === placeholderOf(input);
}

function slotValue(input: HTMLInputElement): string {
  return isEmptySlot(input) ? placeholderOf(input) : input.value.trim();
}

function applySlotDisplay(field: HTMLInputElement, value: string): void {
  const placeholder = placeholderOf(field);
  const empty = !value.trim() || value.trim() === placeholder;
  field.value = empty ? placeholder : value;
  field.classList.toggle('is-empty', empty);
  const width = Math.max(field.value.length, 8);
  field.size = width;
  field.style.minWidth = `${width}ch`;
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
    if (field.classList.contains('slot')) {
      applySlotDisplay(field, value);
      continue;
    }
    const placeholder = placeholderOf(field);
    field.value = !value.trim() || value.trim() === placeholder ? '' : value;
  }
}

export function bindCopy(root: ParentNode = document): void {
  for (const slot of root.querySelectorAll<HTMLInputElement>('.slot')) {
    applySlotDisplay(slot, slot.value);
  }

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

  root.addEventListener('focusin', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.classList.contains('slot')) return;
    if (isEmptySlot(input)) input.select();
  });

  root.addEventListener('input', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;

    if (input.classList.contains('slot')) {
      applySlotDisplay(input, input.value);
    }

    const key = input.dataset.fillField || input.dataset.slot;
    if (key) {
      const scope = input.closest('[data-fill]') ?? root;
      const outgoing = input.classList.contains('slot') && isEmptySlot(input) ? '' : input.value;
      syncFill(scope, key, outgoing, input);
    }
  });

  root.addEventListener('blur', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.classList.contains('slot')) return;
    if (!input.value.trim()) applySlotDisplay(input, '');
  }, true);
}
