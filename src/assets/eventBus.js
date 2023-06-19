import { reactive, readonly } from "vue";

const eventBus = reactive({});

export function emit(event, ...args) {
  if (!eventBus[event]) {
    return;
  }

  for (const handler of eventBus[event]) {
    handler(...args);
  }
}

export function on(event, handler) {
  if (!eventBus[event]) {
    eventBus[event] = [];
  }

  eventBus[event].push(handler);
}

export function off(event, handler) {
  if (!eventBus[event]) {
    return;
  }

  const index = eventBus[event].indexOf(handler);
  if (index > -1) {
    eventBus[event].splice(index, 1);
  }
}

export const EventBus = readonly(eventBus);
